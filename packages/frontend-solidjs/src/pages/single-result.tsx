import { Link, useRouteData, useSearchParams } from 'solid-app-router';
import { Component, createSignal, onMount, Show } from "solid-js";
import { singleResultFacade, Image, ItemState } from "@colorare/backend";

const SingleResult: Component = () => {
  const [_, setImageId] = createSignal<string>()
  const [image, setImage] = createSignal<Image>()
  const [searchParams] = useSearchParams();

  onMount(() => {
    singleResultFacade.init();
    singleResultFacade.selectedImage$.subscribe((image) => setImage(image));
    const imageId = searchParams.d;
    if (imageId && imageId !== "") {
      setImageId(imageId);
      singleResultFacade.updateSelectedImageId(imageId);
    }
  });

  return <>
    <Link href="/">&lt;- back</Link>
    <pre>[{JSON.stringify(image())}]</pre>
    <Show when={image()}>
      <img src={image()?.media?.toString()} />
    </Show>
  </>
}

export default SingleResult;