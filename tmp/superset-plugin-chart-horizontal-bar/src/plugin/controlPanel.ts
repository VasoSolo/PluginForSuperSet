import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig, sections, sharedControls } from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  /**
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
            name: 'labelPosition',
            config: {
              type: 'SelectControl',
              label: t('LabelPosition'),
              default: 'middle',
              choices: [
                // [value, label]
                ['left'],
                ['middle'],
                ['right'],
                ['top'],
                ['bottom']
              ],
              renderTrigger: true,
              description: t('Label position'),
            },
          },
        ],
        /* [
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
        ], */
        [
          {
            //name: 'header_font_size',
            name: 'fontSize',
            config: {
              type: 'SelectControl',
              label: t('Font Size'),
              default: 'xl',
              choices: [
                // [value, label]
                [6, 'xx-small'],
                [8, 'x-small'],
                [12, 'small'],
                [14, 'medium'],
                [16, 'large'],
                [20, 'x-large'],
                [26, 'xx-large'],
              ],
              renderTrigger: true,
              description: t('The size of your font'),
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
