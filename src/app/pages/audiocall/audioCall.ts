import Component from "../../../common/Component";
import CategoriesPage from "./categoriesPage";
import GameFildPage from "./gameFildPage";
import GameOverPage from "./gameOverPage";
import { DataModel } from "./dataModel";
import { Request } from '../../../asset/utils/requests'
import { URL } from '../../../asset/utils/types'

class AudioCall extends Component {
  model: DataModel;
  categoryIndex: number;
  request: Request
  preloader: Component<HTMLElement>;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'audio-call');
    this.request = new Request();

    this.mainCycle()
  }

  private gameCycle(categoryIndex: number) {
    this.preloader = new Component(this.node, 'div', 'preloader');
    if (categoryIndex === 6) {

      this.model = new DataModel()
      this.model.buildHard().then(res => {
        this.preloader.destroy();

        const gameFild = new GameFildPage(this.node, categoryIndex, this.model.getQuestionsHard())

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
        }
      })

    } else {
      const resUrl = []
      for (let i = 0; i < 30; i++) {
        resUrl.push(`${URL.url}${URL.group}${categoryIndex}${URL.page}${i}`)
      }
      this.model = new DataModel()
      this.model.build(resUrl).then(res => {
        this.preloader.destroy();

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
        }
      })
    }
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
