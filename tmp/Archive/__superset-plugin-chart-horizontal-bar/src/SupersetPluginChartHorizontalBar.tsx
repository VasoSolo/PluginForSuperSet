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
import React, { useEffect, createRef } from "react";
import { styled } from "@superset-ui/core";
import { Bar } from "@ant-design/plots";
import { Column } from "@ant-design/plots";
import {
  SupersetPluginChartHorizontalBarProps,
  SupersetPluginChartHorizontalBarStylesProps,
} from "./types";

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts
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
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
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
  } = props;

  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log("Plugin element", root);
  });

  console.log("Plugin props", props);

  //console.log("configFromControlPanel",configFromControlPanel.controlPanelSections)

  const configForVertical = {
    data,
    xField: cols[0],
    yField: metrics[0],
    seriesField: cols[1],
    isGroup: groupMode,
    isPercent: percentMode,
    isStack: stackMode,

    /* yAxis: {
      label: {
        autoRotate: false,
      },
    }, 
    legend: {
      position: "top-left",
    },*/
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
    /* yAxis: {
      label: {
        autoRotate: false,
      },
    },
    legend: {
      position: "top-left",
    },*/
    barWidthRatio: 0.8,
  };
  console.log("config", configForHorizontal);
  console.log("config", configForVertical);

  console.log("typeOfChart", typeOfChart);

  if (typeOfChart === "horizontal") {
    return (
      <Styles
        ref={rootElem}
        boldText={props.boldText}
        headerFontSize={props.headerFontSize}
        height={height}
        width={width}
        groupMode={true}
        stackMode={true}
        percentMode={true}
        typeOfChart={""}
        cols={[]}
        metrics={[]}
      >
        <Bar {...configForHorizontal} />
      </Styles>
    );
  } else {
    return (
      <Styles
        ref={rootElem}
        boldText={props.boldText}
        headerFontSize={props.headerFontSize}
        height={height}
        width={width}
        groupMode={true}
        stackMode={true}
        percentMode={true}
        typeOfChart={""}
        cols={[]}
        metrics={[]}
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
