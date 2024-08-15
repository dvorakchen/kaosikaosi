import { req } from "./request";
import { HEADER_FORM_DATA } from "./request";

export async function publishPosts(id: string, photos: File[]) {
  const formData = new FormData();

  for (const photo of photos) {
    formData.append(photo.name, photo);
  }

  const res = await req.post(`posts/${id}/`, formData, {
    headers: HEADER_FORM_DATA,
  });
}
