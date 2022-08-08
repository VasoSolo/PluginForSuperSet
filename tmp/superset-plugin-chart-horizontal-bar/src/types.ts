import { QueryFormData, supersetTheme, TimeseriesDataRecord } from '@superset-ui/core';

export interface SupersetPluginChartHorizontalBarStylesProps {
  height: number;
  width: number;
  headerFontSize: keyof typeof supersetTheme.typography.sizes;
  boldText: boolean;
  cols: Array<string>;
  metrics: Array<string>;
  groupMode:boolean;
  percentMode:boolean;
  stackMode:boolean;
  typeOfChart:string;
  fontSize:number;
  labelPosition:string;
  maximumXValue:number;
}

interface SupersetPluginChartHorizontalBarCustomizeProps {
  headerText: string;
}

export type SupersetPluginChartHorizontalBarQueryFormData = QueryFormData &
  SupersetPluginChartHorizontalBarStylesProps &
  SupersetPluginChartHorizontalBarCustomizeProps;

export type SupersetPluginChartHorizontalBarProps = SupersetPluginChartHorizontalBarStylesProps &
  SupersetPluginChartHorizontalBarCustomizeProps & {
    data: TimeseriesDataRecord[];
    // add typing here for the props you pass in from transformProps.ts!
  };
