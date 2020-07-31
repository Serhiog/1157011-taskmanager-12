
import {createTaskActionsTemplate} from "./view/taskActions.js";
import {createTasksCategoriesTemplate} from "./view/tasksCategories.js";
import {createContentBoardElementTemplate} from "./view/contentBoardElement.js";
import {createTasksFilterTemplate} from "./view/tasksFilter.js";
import {createListOfBoardTasksTemplate} from "./view/listOfBoardTasks.js";
import {createBlackCardTaskTemplate} from "./view/blackCardTask.js";
import {createLoadMoreBtnTemplate} from "./view/loadMoreBtn.js";
import {createCardEditorTemplate} from "./view/cardEditor.js";
import {render} from "./view/util.js";

const RENDER_BLACK_TASK_CARD = 3;

const siteMainElement = document.querySelector(`main`);
const siteHeaderContainerElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderContainerElement, createTaskActionsTemplate(), `beforeend`);
render(siteMainElement, createTasksCategoriesTemplate(), `beforeend`);
render(siteMainElement, createContentBoardElementTemplate(), `beforeend`);

const siteContentBoardElement = siteMainElement.querySelector(`.board`);
render(siteContentBoardElement, createTasksFilterTemplate(), `afterbegin`);
render(siteContentBoardElement, createListOfBoardTasksTemplate(), `beforeend`);
const siteBoardTasksElement = siteContentBoardElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, createCardEditorTemplate(), `afterbegin`);

for (let i = 0; i < RENDER_BLACK_TASK_CARD; i++) {
  render(siteBoardTasksElement, createBlackCardTaskTemplate(), `beforeend`);
}
render(siteContentBoardElement, createLoadMoreBtnTemplate(), `beforeend`);
