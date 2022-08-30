import Component from "../../../common/Component";
import CategoriesPage from "./categoriesPage";
import GameFildPage from "./gameFildPage";
import GameOverPage from "./gameOverPage";
import { DataModel } from "./dataModel";
import { URL } from '../../../asset/utils/types'

class AudioCall extends Component {
  model: DataModel;
  categoryIndex: number;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'audio-call');
    this.mainCycle()
  }

  private gameCycle(categoryIndex: number) {
    this.model = new DataModel()
    this.model.build(
      `${URL.url}${URL.group}${categoryIndex}${URL.page}${this.getRandome(0, 29)}`,
      `${URL.url}${URL.group}${categoryIndex}${URL.page}${this.getRandome(0, 29)}`,
      `${URL.url}${URL.group}${categoryIndex}${URL.page}${this.getRandome(0, 29)}`
    ).then(res => {

      const gameFild = new GameFildPage(this.node, categoryIndex, this.model.getQuestions())

      gameFild.onBack = () => {
        gameFild.destroy()
        this.mainCycle()
      }

      gameFild.onFinish = (result) => {
        gameFild.destroy()
        const gameOverPage = new GameOverPage(this.node, result)

        gameOverPage.onCategories = () => {
          gameOverPage.destroy()
          this.mainCycle()
        }

        // gameOverPage.onNext = () => {
        //   gameOverPage.destroy()
        //   this.gameCycle(categoryIndex + 1)
        // }
      }
    })
  }

  private mainCycle() {
    const categories = new CategoriesPage(this.node)
    categories.onSelect = (index) => {
      categories.destroy()
      this.gameCycle(index)
    }
  }

  private async getWord(url: string) {
    const resp = await fetch(url);
    return resp.json();
  }

  private getRandome = (min: number, max: number) => Math.round(min - 0.5 + Math.random() * (max - min + 1))

}
export default AudioCall;
