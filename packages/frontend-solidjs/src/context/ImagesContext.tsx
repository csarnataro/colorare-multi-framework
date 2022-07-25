import { createSignal, createContext, useContext, Accessor } from "solid-js";
import { Image } from "../types/image";

type ImagesStore = [Accessor<Image[]>, { setImages: (images: Image[]) => void }]

const ImagesContext = createContext<ImagesStore>();

export function ImagesProvider(props) {
  const [images, setImages] = createSignal(props.images || []);
  const store: ImagesStore = [
    images,
    {
      setImages(items: Image[]) {
        setImages(items);
      }
    }
  ];

  return (
    <ImagesContext.Provider value={store}>
      {props.children}
    </ImagesContext.Provider>
  );
}

export function useImages() { return useContext(ImagesContext); }