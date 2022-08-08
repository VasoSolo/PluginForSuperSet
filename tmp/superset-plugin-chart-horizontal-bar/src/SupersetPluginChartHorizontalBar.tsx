import React, { useEffect, createRef } from "react";
import { styled } from "@superset-ui/core";
import { Bar } from "@ant-design/plots";
import { Column } from "@ant-design/plots";
import {
  SupersetPluginChartHorizontalBarProps,
  SupersetPluginChartHorizontalBarStylesProps,
} from "./types";
// Следующий компонент стилей представляет собой элемент <div>, который был стилизован с использованием Emotion
// Для получения документов посетите https://emotion.sh/docs/styled

// // Переменные тематизации предоставляются для вашего использования через ThemeProvider
// импортировано из @superset-ui/core. Для получения информации о доступных переменных, пожалуйста, посетите
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SupersetPluginChartHorizontalBarStylesProps>`
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  }
`;

/**
 * ******************* ЧТО ВЫ МОЖЕТЕ ПОСТРОИТЬ ЗДЕСЬ *******************
 * По сути, диаграмма содержит несколько ключевых компонентов для работы.:
 * * Данные: предоставлены через `props.data`
 * * Элемент DOM
 * * * * FormData (ваши элементы управления!), предоставленные в качестве реквизита transformProps.ts
 */

export default function SupersetPluginChartHorizontalBar(
  props: SupersetPluginChartHorizontalBarProps
) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const {
    data,
    height,
    width,
    cols,
    metrics,
    groupMode,
    percentMode,
    stackMode,
    typeOfChart,
    fontSize,
    labelPosition,
  } = props;

  const maxCount = data
    .map((item) => {
      return Number(item.count);
    })
    .sort((a, b) => {
      return a - b;
    })
    .pop();

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    //console.log('Plugin element', root);
  });

  console.log("Plugin props", props);

  const configForVertical = {
    data,
    xField: cols[0],
    yField: metrics[0],

    seriesField: cols[1],
    isGroup: groupMode,
    isPercent: percentMode,
    isStack: stackMode,
    yAxis: { max: maxCount ? maxCount + 5 : "" },
    label: {
      position: labelPosition,
      offset: 4,
      style: {
        fontSize: fontSize,
      },
      autoRotate: true,
      layout: [
        /* {
          type: "interval-adjust-position",
        }, */
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    legend: {
      position: "top",
      //'top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'。
    },
    barWidthRatio: 0.8,
  };

  const configForHorizontal = {
    data,
    xField: metrics[0],
    yField: cols[0],
    seriesField: cols[1],
    isGroup: groupMode,
    isPercent: percentMode,
    isStack: stackMode,
    xAxis: { max: maxCount ? maxCount + 5 : "" },
    label: {
      position: labelPosition,
      offset: 4,
      style: {
        fontSize: fontSize,
      },
      autoRotate: true,
      layout: [
        /* {
          type: "interval-adjust-position",
        }, */
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    /* yAxis: {
      label: {
        autoRotate: false,
      },
    }, */
    legend: {
      position: "right",
      //'top', 'top-left', 'top-right', 'left', 'left-top', 'left-bottom', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'。
    },
    barWidthRatio: 0.8,
  };
  console.log("config", configForHorizontal);
  console.log("config", configForVertical);

  console.log("typeOfChart", typeOfChart);
  //typeOfChart === "horizontal" ? console.log("horizontal") : console.log("vertical")

  if (typeOfChart === "horizontal") {
    return (
      <Styles
        ref={rootElem}
        boldText={props.boldText}
        //headerFontSize={props.headerFontSize}
        height={height}
        width={width}
      >
        <Bar {...configForHorizontal} />
      </Styles>
    );
  } else {
    return (
      <Styles
        ref={rootElem}
        boldText={props.boldText}
        //headerFontSize={props.headerFontSize}
        height={height}
        width={width}
      >
        <Column {...configForVertical} />
      </Styles>
    );
  }
}

{
  /* <h3>{props.headerText}</h3>
<pre>${JSON.stringify(data, null, 2)}</pre>
 */
}
