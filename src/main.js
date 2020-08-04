
import { createTaskActionsTemplate } from "./view/taskActions.js";
import { createTasksCategoriesTemplate } from "./view/tasksCategories.js";
import { createContentBoardElementTemplate } from "./view/contentBoardElement.js";
import { createTasksFilterTemplate } from "./view/tasksFilter.js";
import { createListOfBoardTasksTemplate } from "./view/listOfBoardTasks.js";
import { createTaskTemplate } from "./view/blackCardTask.js";
import { createLoadMoreBtnTemplate } from "./view/loadMoreBtn.js";
import { createTaskEditTemplate } from "./view/cardEditor.js";
import { render } from "./view/util.js";
import { generateTask } from "./mock/task.js";
import { generateFilter } from "./mock/filter.js";
import { createFilterTemplate } from "./view/filter.js";

const RENDER_BLACK_TASK_CARD = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(RENDER_BLACK_TASK_CARD).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`main`);
const siteHeaderContainerElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderContainerElement, createTaskActionsTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createTasksCategoriesTemplate(), `beforeend`);
render(siteMainElement, createContentBoardElementTemplate(), `beforeend`);

const siteContentBoardElement = siteMainElement.querySelector(`.board`);
render(siteContentBoardElement, createTasksFilterTemplate(), `afterbegin`);
render(siteContentBoardElement, createListOfBoardTasksTemplate(), `beforeend`);
const siteBoardTasksElement = siteContentBoardElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, createTaskEditTemplate(tasks[0]), `afterbegin`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(siteBoardTasksElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  render(siteContentBoardElement, createLoadMoreBtnTemplate(), `beforeend`);

  const loadMoreButton = siteContentBoardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(siteBoardTasksElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
