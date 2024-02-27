import React from 'react';
import Head from '../Helper/Head';
import useFtech from '../../Hooks/useFetch';
import { STATS_GET } from '../../api';
import Loading from '../Helper/Loading';
import Error from '../Helper/Loading';
//import UserStatsGraphs from './UserStatsGraphs';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = useFtech();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
