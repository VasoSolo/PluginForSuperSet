import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  /**
* эта функция вызывается после успешного ответа.
* получено от конечной точки данных диаграммы и используется для преобразования
* входящие данные перед отправкой в Визуализацию.
*
* Функция transformProps также весьма полезна для возврата
* дополнительные / измененные реквизиты для вашего компонента data viz. Данные формы
* также можно получить доступ из вашего файла SupersetPluginChartHorizontalBar.tsx, но
* предоставление пользовательских реквизитов здесь часто удобно для интеграции третьих сторон
* сторонние библиотеки, которые полагаются на определенные реквизиты.
*
* Описание свойств в `chartProps`:
* - `height`, `width`: высота/ширина элемента DOM, в котором
* диаграмма расположена
* - `FormData`: полезная нагрузка запроса данных диаграммы, которая была отправлена в
* серверная часть.
* - `queriesData`: полезная нагрузка ответа на данные диаграммы, которая была получена
* из бэкэнда. Некоторые примечательные свойства `queriesData`:
* - `данные`: массив с данными, каждая строка с отображением объекта
* столбец/псевдоним к его значению. Пример:
* `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
* - `rowcount`: количество строк в `data`
* - `запрос`: запрос, который был выдан.
*
* Пожалуйста, обратите внимание: функция transformProps кэшируется, когда
* загрузка приложений. При внесении изменений в `transformProps`
* функция во время разработки с горячей перезагрузкой, изменения не будут
* будет отображаться до перезапуска сервера разработки.
   */
  const { width, height, formData, queriesData } = chartProps;
  //const { boldText, headerFontSize, cols, metrics, groupMode, percentMode, stackMode, typeOfChart } = formData;
  const { boldText, fontSize, cols, metrics, groupMode, percentMode, stackMode, typeOfChart,labelPosition } = formData;
  const data = queriesData[0].data as TimeseriesDataRecord[];

  const someNumber = 10
  //console.log('chartProps via TransformProps.ts', chartProps);
  //console.log('formData via TransformProps.ts', formData);
  return {
    width,
    height,
    data,
    cols,
    metrics,
    // and now your control data, manipulated as needed, and passed through as props!
    boldText,
    //headerFontSize,
    fontSize,
    groupMode,
    percentMode,
    stackMode,
    typeOfChart,
    labelPosition,
    someNumber
  };
}
