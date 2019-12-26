import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerModel } from '../../shared/models/test/answer.model';
import { CategoryModel } from '../../shared/models/test/category.model';
import { QuestionModel } from '../../shared/models/test/question.model';
import { SubCategoryModel } from '../../shared/models/test/sub-category.model';
import { TestModel } from '../../shared/models/test/test.model';
import { ApiUrls } from '../api-urls';

@Injectable()
export class TestService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public createTest(test: TestModel): Observable<void> {
    return this.httpClient.post<void>(ApiUrls.getCreateTestUrl(), test);
  }

  public createCategory(name: string): Observable<void> {
    return this.httpClient.post<void>(ApiUrls.getCreateCategoryUrl(), {
      name
    });
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(ApiUrls.getCreateCategoryUrl());
  }

  public getTests(): Observable<TestModel[]> {
    return this.httpClient.get<TestModel[]>(ApiUrls.getCreateTestUrl());
  }

  public getQuestionsByTest(testId: number): Observable<any> {
    return this.httpClient.get<any>(ApiUrls.getQuestionsUrl(), {
      params: {
        test_id: testId.toString()
      }
    });
  }

  public createNewQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.httpClient.post<QuestionModel>(ApiUrls.getQuestionsUrl(), question);
  }

  public updateQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.httpClient.put<QuestionModel>(ApiUrls.getQuestionsUrl(), question);
  }

  public deleteQuestion(id: number): Observable<QuestionModel> {
    return this.httpClient.delete<QuestionModel>(ApiUrls.getQuestionsUrl(), {
      params: {
        question_id: id.toString()
      }
    });
  }

  public createSubcategory(subCategory: SubCategoryModel): Observable<SubCategoryModel> {
    return this.httpClient.post<SubCategoryModel>(ApiUrls.getSubCreateCategoryUrl(), subCategory);
  }

  public getSubcategories(): Observable<SubCategoryModel[]> {
    return this.httpClient.get<SubCategoryModel[]>(ApiUrls.getSubCreateCategoryUrl());
  }

  public createAnswerForQuestion(answer: AnswerModel): Observable<AnswerModel> {
    return this.httpClient.post<AnswerModel>(ApiUrls.getAnswersUrl(), answer);
  }

  public updateAnswerForQuestion(answer: AnswerModel): Observable<AnswerModel> {
    return this.httpClient.put<AnswerModel>(ApiUrls.getAnswersUrl(), answer);
  }

  public getAnswerForQuestion(id: number): Observable<AnswerModel[]> {
    return this.httpClient.get<AnswerModel[]>(ApiUrls.getAnswersUrl(), {
      params: {
        question_id: id.toString()
      }
    });
  }
}
