export interface DashboardMapping {
    labels: string[];
    datasets: Array<DataSetsResp>;
  } 

  export interface DataSetsResp {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }