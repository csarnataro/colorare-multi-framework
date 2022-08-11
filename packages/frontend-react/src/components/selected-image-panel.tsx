import { Image } from "@colorare/backend"

type SelectedImagePanelProps = {
  image?: Image;
  deselectImage: () => void;
}

function printImage(url: URL ) {
    const W = window.open(url);
    W?.window.print();
}

const SelectedImagePanel = (props: SelectedImagePanelProps) => {

  const { deselectImage, image } = props;
  return <div className="mt-2 ml-4 w-4/5 bg-gray-900 h-screen sticky top-0">
      <button onClick={deselectImage} className="opacity-70 hover:opacity:90 bg-gray-500 hover:bg-gray-800 absolute text-white font-bold py-2 px-2 rounded-full top-2 left-2">
        <svg viewBox="0 0 24 24" height="24" width="24">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <div className="w-full p-2">
        <img src={image?.media?.toString()} onClick={() => printImage(image?.media!)}/>
        <div className="text-white">
          <div>{image?.title}</div>
          <div>{image?.domain}</div>
          <div>{`${image?.width}x${image?.height}`}</div>
        </div>
      </div>
    </div>
}

export default SelectedImagePanel;
