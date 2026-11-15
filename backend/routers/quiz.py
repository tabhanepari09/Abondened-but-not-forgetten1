from fastapi import APIRouter, HTTPException
from typing import List
from models import QuizQuestion, QuizSubmission, QuizEvaluationResult, AnswerEvaluation
from data.quiz import QUIZ_DATA

router = APIRouter(prefix="/api/quiz", tags=["quiz"])

@router.get("", response_model=List[QuizQuestion])
def get_quiz_questions():
    return QUIZ_DATA

@router.get("/{question_id}", response_model=QuizQuestion)
def get_quiz_question(question_id: int):
    for q in QUIZ_DATA:
        if q["id"] == question_id:
            return q
    raise HTTPException(status_code=404, detail=f"Question with ID '{question_id}' not found")

@router.post("/evaluate", response_model=QuizEvaluationResult)
def evaluate_quiz(submission: QuizSubmission):
    evaluations: List[AnswerEvaluation] = []
    score = 0
    total = len(QUIZ_DATA)
    
    question_map = {q["id"]: q for q in QUIZ_DATA}

    for answer in submission.answers:
        q = question_map.get(answer.questionId)
        if not q:
            continue
        is_correct = (answer.selectedIndex == q["correctIndex"])
        if is_correct:
            score += 1
        evaluations.append(
            AnswerEvaluation(
                questionId=q["id"],
                selectedIndex=answer.selectedIndex,
                correctIndex=q["correctIndex"],
                isCorrect=is_correct,
                explanation=q["explanation"],
                missionRef=q["missionRef"]
            )
        )
    
    pct = round((score / total * 100), 1) if total > 0 else 0.0
    
    if pct == 100.0:
        rating = "FLIGHT DIRECTOR - PERFECT ARCHIVE ACCURACY"
    elif pct >= 75.0:
        rating = "SENIOR PAYLOAD SPECIALIST - DISTINGUISHED"
    elif pct >= 50.0:
        rating = "MISSION ARCHIVIST - CERTIFIED"
    else:
        rating = "TRAINEE ORBITAL SPECIALIST - REVIEW ARCHIVES"

    return QuizEvaluationResult(
        score=score,
        total=total,
        percentage=pct,
        evaluations=evaluations,
        rating=rating
    )
