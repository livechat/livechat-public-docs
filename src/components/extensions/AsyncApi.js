"use client"
import dynamic from 'next/dynamic';
import "@asyncapi/react-component/styles/default.min.css";
import { useState, useEffect } from 'react';

const AsyncApiComponent = dynamic(() => import('@asyncapi/react-component/browser'), { ssr: false });

export default function AsyncApiDocs(props) {
  const [schema, setSchema] = useState(null)
  const schema1 = async () => {
    const res = await fetch('https://raw.githubusercontent.com/livechat/api/b92bd3ad97ddc2e1a7ab27b6eebf6631644c447b/services/chat-api/docs/spec-rtm.yml?token=GHSAT0AAAAAACMISOCFI356BDWB23EJYSDWZOPOSLQ').then((res) => res.text())
    setSchema((res))
  }

  useEffect(() => {
    schema1()
  }, [])

  return props.schema && <AsyncApiComponent schema={schema} config={{
    "show": {
      "sidebar": false,
      "info": true,
      "operations": true,
      "servers": true,
      "messages": true,
      "schemas": true,
      "errors": true
    },
    "expand":{
      "messageExamples": false
    },
    "sidebar": {
      "showServers": "byDefault",
      "showOperations": "byDefault"
    }
  }} />;
}