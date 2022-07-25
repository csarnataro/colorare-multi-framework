import { Link, useRouteData } from 'solid-app-router';
import { Component, createSignal, Show } from "solid-js";
import { Image } from "../types/image";

const SingleResult: Component = () => {
  const [image, setImage] = createSignal<Image>();
  useRouteData<Promise<Image>>().then((retrievedImage) => {
    console.dir('******** BEGIN: single-result:8 ********');
    console.dir(typeof retrievedImage, { depth: null, colors: true });
    setImage(retrievedImage);
  });
  
  return <>
    <Link href="/">&lt;- back</Link>
    <Show when={image()}>
      <img src={image().media} />
    </Show>
  </>
}

export default SingleResult;