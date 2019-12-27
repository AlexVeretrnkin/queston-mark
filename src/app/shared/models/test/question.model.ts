export class QuestionModel {
  public id?: number;
  public name: string;
  public text: string;
  public category: string;
  public test: number;
  public position: number;

  constructor() {
    this.id = null;
    this.name = '';
    this.text = '';
    this.category = '';
    this.test = null;
    this.position = null;
  }
}
