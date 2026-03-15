import { ColDef } from 'ag-grid-community';

export const columnDefs: ColDef[] = [
  {
    field: 'cityName',
    headerName: 'City',
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 120,
    cellStyle: { fontWeight: '500', color: '#2d3748' },
  },
  {
    field: 'temperature',
    headerName: 'Temperature',
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 110,
    valueFormatter: (params) => {
      return params.value !== undefined && params.value !== null
        ? `${params.value}°C`
        : 'N/A';
    },
    cellStyle: (params) => {
      const temp = params.value;
      if (temp > 25) return { color: '#e53e3e', fontWeight: '500' };
      if (temp < 0) return { color: '#3182ce', fontWeight: '500' };
      return { color: '#38a169', fontWeight: '500' };
    },
  },
  {
    field: 'windspeed',
    headerName: 'Wind Speed',
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
    valueFormatter: (params) => {
      return params.value !== undefined && params.value !== null
        ? `${params.value} km/h`
        : 'N/A';
    },
    cellStyle: { color: '#4a5568' },
  },
  {
    field: 'weatherDescription',
    headerName: 'Description',
    sortable: true,
    filter: true,
    flex: 2,
    minWidth: 150,
    cellStyle: {
      fontStyle: 'italic',
      color: '#4a5568',
      textTransform: 'capitalize',
    },
  },
  {
    field: 'date',
    headerName: 'Date & Time',
    sortable: true,
    filter: true,
    flex: 1.5,
    minWidth: 160,
    valueFormatter: (params) => {
      if (params.value) {
        const date = new Date(params.value);
        return date.toLocaleString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
      return '';
    },
    cellStyle: {
      color: '#718096',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
    },
  },
];

export const defaultColDef: ColDef = {
  resizable: true,
  sortable: true,
  filter: 'agTextColumnFilter',
  floatingFilter: false,
  cellStyle: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
};
