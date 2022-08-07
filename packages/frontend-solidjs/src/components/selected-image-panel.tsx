import { Image } from "@colorare/backend"
import { Component, Show } from "solid-js"

type SelectedImagePanelProps = {
  image?: Image;
  deselectImage: () => void;
}

function printImage(url: URL ) {
    const W = window.open(url);
    W?.window.print();
}

const SelectedImagePanel: Component<SelectedImagePanelProps> = (props: SelectedImagePanelProps) => {
  return <div class="mt-2 ml-4 w-4/5 bg-gray-900 h-screen sticky top-0">
      <button onClick={props.deselectImage} class="opacity-70 hover:opacity:90 bg-gray-500 hover:bg-gray-800 absolute text-white font-bold py-2 px-2 rounded-full top-2 left-2">
        <svg viewBox="0 0 24 24" height="24" width="24">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <div class="w-full p-2">
        <img src={props.image?.media?.toString()} onClick={() => printImage(props.image?.media!)}/>
        <div class="text-white">
          <div>{props.image?.title}</div>
          <div>{props.image?.domain}</div>
          <div>{`${props.image?.width}x${props.image?.height}`}</div>
        </div>
      </div>
    </div>
}

export default SelectedImagePanel;
