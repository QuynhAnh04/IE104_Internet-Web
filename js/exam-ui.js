/* exam-ui.js - exam UI: sidebar list, timer, submit popup */

document.addEventListener('DOMContentLoaded', initExamUI);

let _examTimerId = null;

function initExamUI(){
  const questions = Array.from(document.querySelectorAll('.exam-question'));
  const qList = document.getElementById('questionList');
  const timerEl = document.getElementById('examTimer');

  // build sidebar
  if (qList){
    qList.innerHTML = '';
    questions.forEach((q, idx) => {
      const id = q.dataset.questionId ?? (idx+1);
      const li = document.createElement('li');
      li.textContent = id;
      li.dataset.qid = id;
      li.addEventListener('click', () => {
        q.scrollIntoView({behavior:'smooth', block:'center'});
        setActiveQuestion(id);
      });
      qList.appendChild(li);
    });
  }

  // radio listeners
  document.querySelectorAll('.exam-question input[type="radio"]').forEach(r => {
    r.addEventListener('change', (e) => {
      const q = e.target.closest('.exam-question');
      if (!q) return;
      const qid = q.dataset.questionId;
      markAnswered(qid, true);
      updateAnsweredCount();
    });
  });

  setActiveQuestion(questions[0]?.dataset.questionId);
  startExamTimer(timerEl, 30*60);
  document.getElementById('submitExamBtn')?.addEventListener('click', () => onSubmitExam(false));
  updateAnsweredCount();
}

function setActiveQuestion(qid){
  document.querySelectorAll('.exam-question').forEach(q=> q.classList.toggle('active', q.dataset.questionId === String(qid)));
  document.querySelectorAll('#questionList li').forEach(li=> li.classList.toggle('active', li.dataset.qid === String(qid)));
}

function markAnswered(qid, answered){
  const li = document.querySelector(`#questionList li[data-qid='${qid}']`);
  if (li) li.classList.toggle('answered', !!answered);
}

function updateAnsweredCount(){
  const total = document.querySelectorAll('.exam-question').length;
  const answered = document.querySelectorAll('.exam-question input[type="radio"]:checked').length;
  const el = document.getElementById('answeredCount');
  if (el) el.textContent = `Đã trả lời: ${answered} / ${total}`;
}

function startExamTimer(el, seconds){
  if (!el) return;
  let remaining = parseInt(seconds,10) || 0;
  function fmt(s){
    const mm = Math.floor(s/60).toString().padStart(2,'0');
    const ss = (s%60).toString().padStart(2,'0');
    return `${mm}:${ss}`;
  }
  el.textContent = fmt(remaining);
  _examTimerId && clearInterval(_examTimerId);
  _examTimerId = setInterval(()=>{
    remaining--;
    el.textContent = fmt(remaining);
    if (remaining <= 0){
      clearInterval(_examTimerId);
      _examTimerId = null;
      onSubmitExam(true);
    }
  },1000);
}

// default correct answers map - adjust as needed
const correctAnswers = {
  "1":"1","2":"2","3":"3","4":"3","5":"1","6":"1",
  "7":"2","8":"1","9":"1","10":"2","11":"4","12":"1"
};

function onSubmitExam(auto=false){
  const totalQs = document.querySelectorAll('.exam-question').length;
  let score = 0;
  const details = [];

  for (let i=1;i<=totalQs;i++){
    const qEl = document.querySelector(`.exam-question[data-question-id='${i}']`);
    const checked = qEl?.querySelector('input[type="radio"]:checked');
    const chosen = checked ? String(checked.value) : null;
    const correct = correctAnswers[String(i)] ?? null;

    qEl?.classList.remove('correct','incorrect');
    const li = document.querySelector(`#questionList li[data-qid='${i}']`);
    li?.classList.remove('correct','incorrect');

    if (chosen !== null && correct !== null){
      if (chosen === correct){
        score++;
        qEl?.classList.add('correct');
        li?.classList.add('correct');
        details.push({i, ok:true});
      } else {
        qEl?.classList.add('incorrect');
        li?.classList.add('incorrect');
        details.push({i, ok:false, chosen, correct});
      }
    } else {
      details.push({i, ok:false, chosen, correct});
      li?.classList.add('incorrect');
      qEl?.classList.add('incorrect');
    }
    
    // Reveal correct/wrong options and disable inputs
    if (qEl){
      // disable all inputs to prevent changes after submit
      qEl.querySelectorAll('input[type="radio"]').forEach(inp => inp.disabled = true);

      // highlight correct option
      if (correct !== null){
        const correctInput = qEl.querySelector(`input[type="radio"][value="${correct}"]`);
        const correctLabel = correctInput ? correctInput.closest('.option-label') : null;
        if (correctLabel) correctLabel.classList.add('correct');
      }

      // highlight chosen wrong option
      if (chosen !== null && chosen !== correct){
        const chosenInput = qEl.querySelector(`input[type="radio"][value="${chosen}"]`);
        const chosenLabel = chosenInput ? chosenInput.closest('.option-label') : null;
        if (chosenLabel) chosenLabel.classList.add('incorrect');
      }
    }
  }

  if (_examTimerId){ clearInterval(_examTimerId); _examTimerId = null; }

  showScoreModal(score, totalQs, details, auto);
}

function showScoreModal(score, total, details, auto){
  document.getElementById('scoreModalOverlay')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'scoreModalOverlay';

  const modal = document.createElement('div');
  modal.id = 'scoreModal';

  const title = document.createElement('h3');
  title.textContent = 'Kết quả bài thi';
  modal.appendChild(title);

  const scoreNum = document.createElement('div');
  scoreNum.className = 'score-num';
  scoreNum.textContent = `Điểm: ${score} / ${total}`;
  modal.appendChild(scoreNum);

  const scoreDetail = document.createElement('div');
  scoreDetail.className = 'score-detail';
  scoreDetail.textContent = auto ? 'Bài đã được nộp tự động do hết giờ.' : 'Bạn đã nộp bài.';
  modal.appendChild(scoreDetail);

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'font-size:0.95rem; max-height:200px; overflow:auto; margin-bottom:8px;';
  details.forEach(d => {
    const item = document.createElement('div');
    if (d.ok){
      item.style.color = '#0b662e';
      item.textContent = `Câu ${d.i}: Đúng`;
    } else {
      item.style.color = '#9b2a2a';
      const chosenText = d.chosen ? `(chọn: ${d.chosen})` : '(chưa chọn)';
      item.textContent = `Câu ${d.i}: Sai ${chosenText} - Đáp án: ${d.correct ?? '-'} `;
    }
    listWrap.appendChild(item);
  });
  modal.appendChild(listWrap);

  const actions = document.createElement('div');
  actions.style.textAlign = 'right';
  const closeBtn = document.createElement('button');
  closeBtn.id = 'closeScoreBtn';
  closeBtn.className = 'btn';
  closeBtn.textContent = 'Đóng';
  actions.appendChild(closeBtn);
  modal.appendChild(actions);

  overlay.appendChild(modal);

  // Insert the result box right after the submit button when possible.
  const submitBtn = document.getElementById('submitExamBtn');
  if (submitBtn && submitBtn.parentNode){
    // insert after the submit button element
    submitBtn.insertAdjacentElement('afterend', overlay);
  } else {
    // fallback to appending to body
    document.body.appendChild(overlay);
  }

  document.getElementById('closeScoreBtn')?.addEventListener('click', () => { overlay.remove(); });
}

// expose simulateAnswers for testing
function simulateAnswers(answersMap = {}, correctMap = null){
  for (const [k,v] of Object.entries(answersMap)){
    const q = document.querySelector(`.exam-question[data-question-id='${k}']`);
    if (!q) continue;
    const input = q.querySelector(`input[type="radio"][value="${v}"]`);
    if (input){ input.checked = true; markAnswered(k, true); }
  }
  updateAnsweredCount();
  if (correctMap) return onSubmitExam(false);
  return null;
}
