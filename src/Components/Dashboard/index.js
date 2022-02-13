import { useEffect, useState } from 'react';
import { DATA_URL } from '../../constants';
import Table from './Table';
import './Dashboard.scss';

const Dashboard = () => {
  const [data, setData] = useState();
  const [configs, setConfigs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(DATA_URL);
      const json = await response.json();
      setData(json);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const configItems = [];
    Object.keys(data).forEach((key) => {
      if (key.includes('config')) {
        configItems.push(data[key]);
      }
    });
    setConfigs(configItems);
  }, [data]);

  if (!data) return null;

  return (
    <div className="wt-dashboard">
      {configs.map((config, i) => (
        <Table config={config} data={data.data?.query} key={i} />
      ))}
    </div>
  );
};

export default Dashboard;
