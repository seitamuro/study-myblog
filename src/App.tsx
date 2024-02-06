import { Amplify, ResourcesConfig } from "aws-amplify";
import { generateClient } from "@aws-amplify/api";
import config from "./aws-exports.js";
import { useEffect, useState } from "react";

import { listMyQuery } from "./graphql/query";

Amplify.configure(config as ResourcesConfig);
const client = generateClient(config.API.GraphQL as any);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetchQuery() as any
      if (res.data) {
        console.log(res.data.listMyCustomTypes.items)
        setData(res.data.listMyCustomTypes.items)
      }
    })();
  }, []);

  return (
    <>
      {!data ? "Loading..." : data.map((item: any) => <p>{`${item.title}: ${item.content}`}</p>)}
    </>
  );
}

async function fetchQuery() {
  try {
    const data = await client.graphql({
      query: listMyQuery
    })
    return data
  } catch (err) {
    console.error(err)
  }
  return []
}

export default App;
