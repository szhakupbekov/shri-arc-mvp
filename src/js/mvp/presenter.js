/* eslint-disable no-underscore-dangle, class-methods-use-this */
import Logger from '../utils/logger';

class Presenter {
  /**
   * Создает презентер
   * @param {Model} model - модель данных с которой работает презентер.
   */
  constructor(model) {
    this._model = model;
    this._view = null;
    this._qState = null;
    this._updatedView = null;
  }

  init(view) {
    Logger.log('Прошла инициализация');
    this._bindView(view);
    this._renderView();
  }

  /**
   * Привязать представление к презентеру
   * @param {Function} view - функция которая возвращает экземпляр конструктора представления
   * с заданными параметрами
   */
  _bindView(view) {
    this._view = view;
    Logger.log('Привязал представление к презентеру');
  }

  _getQState() {
    this._qState = this._model.getState();
    Logger.log('Получил текущее состояние модели');
  }

  _updateViewData() {
    this._getQState();
    this._updatedView = this._view(this._qState);
  }

  _renderView() {
    this._updateViewData();
    this._updatedView.renderView();
    Logger.log('Отрендерил представление');
  }
}

export default Presenter;
