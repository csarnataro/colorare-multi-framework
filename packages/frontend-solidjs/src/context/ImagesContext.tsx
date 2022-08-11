import { Image } from "@colorare/backend";
import { createSignal, createContext, useContext, Accessor } from "solid-js";

type ImagesStore = [Accessor<Image[]>, { setImages: (images: Image[]) => void }]

const ImagesContext = createContext<ImagesStore>();

export function ImagesProvider(props: any) {
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