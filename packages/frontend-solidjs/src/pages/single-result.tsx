import { Link, useRouteData, useSearchParams } from 'solid-app-router';
import { Component, createSignal, Show } from "solid-js";
import { Image } from "@colorare/backend";

const SingleResult: Component = () => {
  // const [image, setImage] = createSignal<Image>();
  
  const [searchParams, setSearchParams] = useSearchParams();

  // const image = useRouteData();
  console.dir('******** BEGIN: single-result:9 ********');
  console.dir(searchParams.d, { depth: null, colors: true });
  console.dir('********   END: single-result:9 ********');
  
  const image = JSON.parse(atob(searchParams.d));
  // .then((retrievedImage) => {
  //   setImage(retrievedImage);
  //   console.dir('******** BEGIN: single-result:8 ********');
  //   console.dir(typeof retrievedImage, { depth: null, colors: true });
  // });
  
  return <>
    <Link href="/">&lt;- back</Link>
    <Show when={image}>
      <img src={image?.media?.toString()} />
    </Show>
  </>
}

export default SingleResult;