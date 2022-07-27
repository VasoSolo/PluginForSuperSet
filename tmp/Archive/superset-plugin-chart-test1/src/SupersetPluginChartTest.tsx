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
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { SupersetPluginChartTestProps, SupersetPluginChartTestStylesProps } from './types';
//import { Bar } from '@ant-design/plots';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SupersetPluginChartTestStylesProps>`
  /*background-color: ${({ theme }) => theme.colors.secondary.light2};*/
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  

  h3 {
    /* You can use your props to control CSS! */
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
    font-size: ${({ theme, headerFontSize }) => theme.typography.sizes[headerFontSize]}px;
    font-weight: ${({ theme, boldText }) => theme.typography.weights[boldText ? 'bold' : 'normal']};
  }

  pre {
    height: ${({ theme, headerFontSize, height }) => (
      height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]
    )}px;
  }
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
* По сути, диаграмма содержит несколько ключевых компонентов для работы.:
* * Данные: предоставлены через `props.data`
* * Элемент DOM
* * * * * * * * Данные формы (ваши элементы управления!), предоставленные в качестве реквизита transformProps.ts
 */

export default function SupersetPluginChartTest(props: SupersetPluginChartTestProps) {
  // высота и ширина - это высота и ширина элемента DOM в том виде, в каком он существует на панели мониторинга.
// Существует также реквизит `данные`, который, конечно же, является вашими ДАННЫМИ 🎉
  const { data, height, width} = props;
  const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
 // Часто вы просто хотите завладеть DOM и сойти с ума.
// // Здесь вы можете сделать это с помощью createRef и крючка useEffect.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);


  



  return (
<Styles
ref={rootElem}
boldText={props.boldText}
headerFontSize={props.headerFontSize}
height={height}
width={width}
>
<h3>Hello from vaso2</h3>
<pre>${JSON.stringify(data, null, 2)}</pre>
</Styles>
  );
}
//

{/* <Styles
ref={rootElem}
boldText={props.boldText}
headerFontSize={props.headerFontSize}
height={height}
width={width}
>
<h3>Hello from vaso2</h3>
<pre>${JSON.stringify(data, null, 2)}</pre>
</Styles> */}
