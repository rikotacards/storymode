import React from "react";

export const useCreateLocalImageUrls = () => {
  console.log('useCreate logged')
  // triggered by onChange from file upload
  // imageBlobs are the initial data received from upload
  const [imageBlobs, setImageBlobs] = React.useState(
    [] as (Blob | MediaSource)[]
  );
  const [imageDataUrls, setDataUrls] = React.useState<string[]>([]);
  // Object Urls to be used to display images locally right after upload in <img/>
  // NOT used for upload
  const [objectUrls, setObjectUrls] = React.useState<string[]>([]);
  React.useEffect(() => {
    if (imageBlobs.length < 1) return;
    console.log('blobs', imageBlobs)
    // objectUrls are passed into <img src/> right after change
    // to display locally
    const objectUrls: string[] = [];

    imageBlobs.forEach(async (image:any) => {
      objectUrls.push(URL.createObjectURL(image));
      let dataUrl = await new Promise((r) => {
        let a = new FileReader();
        a.onload = r;
        a.readAsDataURL(image);
      }).then((e) => {
        // todo
        let b = e as any;
        return b.target?.result;
      });
      setDataUrls((prev) => [...prev, dataUrl]);
    });
    setObjectUrls(objectUrls);
  }, [imageBlobs, objectUrls]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onchange fired', e.target.files)
    // if (e.target.files === null) {
    //   return;
    // }
    setImageBlobs([e.target.files[0]]);
  };
  return {
    // passed to the div element for upload
    onChange,
    // to be uploaded to firebase
    imageDataUrls,
    // used locally
    objectUrls,
  };
};
