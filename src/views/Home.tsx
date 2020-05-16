import React, {ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {IntentState} from "../redux/store";
import {ImageAsset, ShareAsset, ShareTargetEventData, TextAsset} from "@marwonline/capacitor-share-target/src/definitions";

function isTextAsset(data: ShareAsset): data is TextAsset {
  return data.assetType === 'text';
}

function isImageAsset(data: ShareAsset): data is ImageAsset {
  return data.assetType === 'image';
}

function Payload(props: {data: ShareAsset}): ReactElement | null {
  if (isTextAsset(props.data)) {
    return <span>props.data.text</span>;
  }
  if (isImageAsset(props.data)) {
    return <img src={props.data.uri}/>;
  }
  return null;
}



export const Home = () => {
  const events = useSelector((state: IntentState) => state.events);

  return (<>
    <h1>Home</h1>
    <p>This is a test app which will consume all given data!</p>
    <p><b>Attention:</b> Only the Android version "works" right now</p>
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Item</td>
          <td>MimeType</td>
          <td>Data</td>
        </tr>
      </thead>
      <tbody>
      {events.map((event:ShareTargetEventData, eventIndex: number) => {
        return event.items.map((eventItem, itemIndex) => {
          return <tr key={`${eventIndex}-${itemIndex}`}>
            <td>{eventIndex}</td>
            <td>{itemIndex+1}/{event.items.length}</td>
            <td>{eventItem.mimeType}</td>
            <td><Payload data={eventItem} /></td>
          </tr>
        });
      })}
      </tbody>
    </table>
  </>)
};