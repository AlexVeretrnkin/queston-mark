import { AnswerModel } from './answer.model';
import { QuestionModel } from './question.model';

export class AnswerQuestionModel {
  public question: QuestionModel;
  public answers: AnswerModel[];
}
