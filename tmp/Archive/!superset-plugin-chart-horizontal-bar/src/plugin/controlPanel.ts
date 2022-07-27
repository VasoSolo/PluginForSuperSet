/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig, sections, sharedControls } from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (tranlated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   * Панель управления разделена на две вкладки: "Запрос" и
* "Параметры диаграммы". Элементы управления, которые определяют входные данные для
* запрос данных диаграммы, таких как столбцы и показатели, обычно
* находиться в "Запросе", в то время как элементы управления, влияющие на визуальный
* внешний вид или функциональность диаграммы находятся под
* Раздел "Параметры диаграммы".
*
* Существует несколько предопределенных элементов управления, которые можно использовать.
* Несколько примеров:
* - groupby: столбцы для группировки по (переводится в оператор GROUP BY)
* - series: то же, что и groupby, но одиночный выбор.
* - metrics: несколько метрик (переведенных в агрегированное выражение)
* - metric: нормальная как метрика, но одиночный выбор
* - adhoc_filters: фильтры (переведенные КУДА или ИМЕЮЩИЕ
* в зависимости от типа фильтра)
* - row_limit: максимальное количество строк (переведено в оператор LIMIT)
*
* Если панель управления имеет как элементы управления "series", так и "groupby", и
* пользователь выбрал `col1` в качестве значения для элемента управления `series`,
* и `col2` и `col3` в качестве значений для элемента управления `groupby`,
* результирующий запрос будет содержать три столбца `groupby`. Это потому что
* мы рассмотрели элемент управления `series` в поле запроса `groupby` и его значение
* автоматически добавит поле `groupby` при создании запроса.
*
* Также можно определить пользовательские элементы управления, импортировав
* необходимые зависимости и переопределение параметров по умолчанию, которые
* затем может быть помещен в раздел `controlSetRows`.
* из раздела `Запрос` вместо предопределенного элемента управления.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an intger or decimal value
   * В дополнение к базовому раскрывающемуся элементу управления существует несколько предопределенных
* типы элементов управления (можно задать с помощью свойства 'type'), которые можно использовать. Некоторые
* часто используемые примеры:
* - SelectControl: выпадающий список для выбора одного или нескольких значений,
столбцов
* - MetricsControl: выпадающий список для выбора метрик, запускающий модальный
для определения деталей метрики
* - AdhocFilterControl: Управление для выбора фильтров
* - CheckboxControl: флажок для выбора значений true/false
* - SliderControl: ползунок с минимальными / максимальными значениями
* - TextControl: Управление текстовыми данными
*
* Для получения дополнительных типов управляющих входных данных ознакомьтесь с репозиторием "инкубатор-надмножество".
* и откройте этот файл: superset-frontend/src/explore/components/controls/index.js
*
* Чтобы убедиться, что все элементы управления заполнены правильно, выполните следующие действия
* предоставляются валидаторы
* с помощью ' @superset-ui/core/lib / validator`:
* - validateNonEmpty: должно иметь хотя бы одно значение
* - validateInteger: должно быть целочисленным значением
* - validateNumber: должно быть целым или десятичным значением.
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Columns'),
              description: t('Columns to group by'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              // можно добавить валидаторы к элементам управления, если
              // необходимо применить определенные параметры/ типы
              validators: [validateNonEmpty],
            },
          },
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Controls'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'typeOfChart',
            config: {
              type: 'SelectControl',
              label: t('Type'),
              default: 'horizontal',
              choices: [
                // [value, label]
                ['horizontal'],
                ['vertical'],
              ],
              renderTrigger: true,
              description: t('Type of chart'),
            },
          },
        ],
        [
          {
            name: 'bold_text',
            config: {
              type: 'CheckboxControl',
              label: t('Bold Text'),
              renderTrigger: true,
              default: true,
              description: t('A checkbox to make the '),
            },
          },
        ],
        [
          {
            name: 'header_font_size',
            config: {
              type: 'SelectControl',
              label: t('Font Size'),
              default: 'xl',
              choices: [
                // [value, label]
                ['xxs', 'xx-small'],
                ['xs', 'x-small'],
                ['s', 'small'],
                ['m', 'medium'],
                ['l', 'large'],
                ['xl', 'x-large'],
                ['xxl', 'xx-large'],
              ],
              renderTrigger: true,
              description: t('The size of your header font'),
            },
          },
        ],
        [
          {
            name: 'groupMode',
            config: {
              type: 'SelectControl',
              label: t('Group'),
              default: 'no',
              choices: [
                // [value, label]
                [true, 'yes'],
                [false, 'no'],
              ],
              renderTrigger: true,
              description: t('Use group mode'),
            },
          },
        ],
        [
          {
            name: 'percentMode',
            config: {
              type: 'SelectControl',
              label: t('Percent'),
              default: 'no',
              choices: [
                // [value, label]
                [true, 'yes'],
                [false, 'no'],
              ],
              renderTrigger: true,
              description: t('Use percent mode'),
            },
          },
        ],
        [
          {
            name: 'stackMode',
            config: {
              type: 'SelectControl',
              label: t('Stack'),
              default: 'no',
              choices: [
                // [value, label]
                [true, 'yes'],
                [false, 'no'],
              ],
              renderTrigger: true,
              description: t('Use stack mode'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;
