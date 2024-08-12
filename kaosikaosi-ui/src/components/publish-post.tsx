import { ChangeEvent, useMemo, useRef, useState } from "react";
import { Download, XCircle } from "./icons";
import { isAllowedPhoto, ALLOWED_PHOTO_EXTENSIONS } from "~/global";

export function PublishPost() {
  let photoInput = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<File[]>([]);

  function fileAccept(): string {
    const extensions: string[] = [];
    ALLOWED_PHOTO_EXTENSIONS.forEach((v) => {
      let t = v;
      if (!t.startsWith(".")) {
        t = `.${t}`;
      }

      extensions.push(t);
    });

    return extensions.join(",");
  }

  function handleClick() {
    photoInput.current!.click();
  }

  function fileChange(ev: ChangeEvent<HTMLInputElement>) {
    let fileList = ev.target.files;
    if (fileList === null || fileList.length === 0) {
      return;
    }

    for (const file of fileList) {
      if (
        isAllowedPhoto(file.name) &&
        !photos.some((t) => t.name === file.name)
      ) {
        photos.push(file);
      }
    }

    setPhotos([...photos]);
  }

  function handleRemovePhoto(photo: File) {
    setPhotos([...photos.filter((v) => v.name !== photo.name)]);
  }

  return (
    <main className="space-y-4">
      <section className="flex p-4 border border-primary rounded-lg">
        <input
          type="file"
          hidden
          multiple
          accept={fileAccept()}
          ref={photoInput}
          onChange={fileChange}
        />
        <div
          className="form-control min-w-full max-w-xs cursor-pointer bg-base-200 shadow"
          onClick={handleClick}
        >
          <div className="w-full h-52 flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-2">
              <Download />
            </div>
            <p>点击选择图片或拖拽图片到这里</p>
          </div>
        </div>
      </section>

      <section>
        <h2>准备上传: </h2>
        <div className="flex flex-wrap gap-4">
          {photos.map((photo) => (
            <ImagePreview
              key={photo.name}
              photo={photo}
              onRemove={() => handleRemovePhoto(photo)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function ImagePreview({
  photo,
  onRemove,
}: {
  photo: File;
  onRemove?: () => void;
}) {
  const url = useMemo(() => URL.createObjectURL(photo), [photo]);

  function handleRemove() {
    URL.revokeObjectURL(url);

    onRemove && onRemove();
  }

  return (
    <div className="w-full sm:w-40 overflow-clip flex flex-col mb-4">
      <p className="whitespace-nowrap">{photo.name}</p>
      <a target="_blank" href={url} className="w-fit btn btn-link btn-sm">
        预览
      </a>
      <div className="relative max-h-72 mt-2">
        <img
          src={url}
          alt={photo.name}
          className="max-h-full rounded-md self-center"
        />
        <button
          className="absolute top-2 right-2 btn btn-circle btn-outline btn-xs"
          onClick={handleRemove}
        >
          <XCircle />
        </button>
      </div>
    </div>
  );
}
