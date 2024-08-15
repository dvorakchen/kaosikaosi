import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import { CloudArrowUp, XCircle } from "./icons";
import { isAllowedPhoto, ALLOWED_PHOTO_EXTENSIONS } from "~/global";
import { publishPosts } from "~/http/post";
import { useCurrentUser } from "~/hooks";
import { Loading } from "./loading";

export function PublishPost() {
  const cu = useCurrentUser()!;

  let photoInput = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitDisabled, setSubmitDisabled] = useState(photos.length === 0);
  const [isLoading, setIsLoading] = useState(false);

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

  function handleDragEnter(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  function handleDragOver(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  function handleDrop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    ev.stopPropagation();

    const fileList = ev.dataTransfer.files;
    setFileListToPhotos(fileList);
  }

  function fileChange(ev: ChangeEvent<HTMLInputElement>) {
    let fileList = ev.target.files;
    if (fileList === null || fileList.length === 0) {
      return;
    }

    setFileListToPhotos(fileList);
  }

  function setFileListToPhotos(fileList: FileList) {
    for (const file of fileList) {
      if (
        isAllowedPhoto(file.name) &&
        !photos.some((t) => t.name === file.name)
      ) {
        photos.push(file);
      }
    }
    if (photos.length > 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }

    setPhotos([...photos]);
  }

  function handleRemovePhoto(photo: File) {
    const newPhotos = [...photos.filter((v) => v.name !== photo.name)];

    if (newPhotos.length === 0) {
      setSubmitDisabled(true);
    }

    setPhotos(newPhotos);
  }

  async function handleSubmit() {
    if (photos.length <= 0) {
      return;
    }

    setSubmitDisabled(true);
    setIsLoading(true);
    await publishPosts(cu.id, photos);
    setSubmitDisabled(false);
    setIsLoading(false);
  }

  return (
    <main className="relative flex flex-col space-y-4 w-full h-full">
      <Loading isLoading={isLoading} />
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
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="w-full h-52 flex flex-col items-center justify-center">
            <div className="w-20 h-20 mb-2">
              <CloudArrowUp />
            </div>
            <p>点击选择图片或拖拽图片到这里</p>
          </div>
        </div>
      </section>

      <section className="flex-grow">
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

      <section className="sticky bottom-0 pt-8 bg-gradient-to-t from-base-100 to-transparent">
        <button
          className="btn btn-primary w-full"
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          提交
        </button>
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
      <p className="whitespace-nowrap font-bold">{photo.name}</p>
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
