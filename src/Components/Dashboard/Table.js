import React, { useState, useRef, useEffect } from 'react';
import { formatNumber, useDetectRefDimensions } from '../../helpers';
import { getDataByIndex } from './helpers';

const PlotItem = ({ min, max, value }) => {
  const ref = useRef();
  const [plotDistance, setPlotDistance] = useState(0);
  const { width } = useDetectRefDimensions(ref);

  useEffect(() => {
    if (!min || !max || !width || !value) return;
    const currPercentage = ((value - min) / (max - min)) * 100;
    const actualPercentage = (width + 4) * (currPercentage / 100);
    setPlotDistance(actualPercentage > width ? width : actualPercentage);
  }, [min, max, width, value]);
  return (
    <div ref={ref} className="wt-plot--item">
      <span style={{ left: `${plotDistance}px` }}></span>
    </div>
  );
};

const Plots = ({ data, suffix, headerTitle, config, decimals = 0 }) => {
  const minValue = Math.min(...data.map((o) => o.v));
  const maxValue = Math.max(...data.map((o) => o.v));
  if (config?.isHidden) return null;
  return (
    <div className="wt-plot">
      <h4 className="wt-plot--header">
        {headerTitle}
      </h4>
      {config.showPlot && (
        <div className="wt-plot--subheader">
          <div className="wt-plot--row">
            <div className="wt-plot--cell label" />
            <div className="wt-plot--subheader-labels">
              <p>{formatNumber(minValue)}</p>
              <p>{formatNumber(maxValue)}</p>
            </div>
          </div>
        </div>
      )}
      <div className="wt-plot--body">
        {data.map((d, i) => (
          <div className="wt-plot--row" key={i}>
            {config.showValue && (
              <div className="wt-plot--cell label">
                {`${formatNumber(d.v, decimals)}${suffix}`}
              </div>
            )}
            {config.showPlot && (
              <div className="wt-plot--cell plot">
                <PlotItem min={minValue} max={maxValue} value={d.v} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AppClients = ({ clients }) => (
  <div className="wt-clients">
    {clients.map((client, i) => (
      <p key={i}>{client.title}</p>
    ))}
  </div>
);

const Table = ({ config, data }) => {
  const { headers, meta, data: plots } = data;
  const dataContentHeaders = headers.filter((h) => h.title?.toLowerCase() !== 'browser');

  return (
    <div className="wt-table">
      <AppClients clients={meta} />
      <div className="wt-table--contents">
        {dataContentHeaders.map((header, i) => (
          <Plots
            data={getDataByIndex(plots, i)}
            headerTitle={header.title}
            suffix={header.suffix}
            config={config[i]}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Table;
