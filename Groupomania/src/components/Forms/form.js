import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

export function useMultiPartForm() {
  const { userData } = useAuthStore();
  const { user } = userData;

  // form input refs
  const fileTarget = ref(null);
  const biography = ref(null);
  const title = ref(null);
  const content = ref(null);
  const owner_id = ref(null);
  owner_id.value = user.id;

  function handleFileUpload(event) {
    fileTarget.value = event.target.files[0];
    console.log(fileTarget.value);
  };


  function handleData() {
    const formData = new FormData();
    if (fileTarget.value != null) {
      formData.append("image", fileTarget.value, fileTarget.value.name);
    }
    if (biography.value != null) {
      formData.append("biography", biography.value);
    }
    if (title.value != null) {
      formData.append("title", title.value);
    }
    if (content.value != null) {
      formData.append("content", content.value);
    }
    if (owner_id.value != null) {
      formData.append("owner_id", owner_id.value);
    }
    return formData;
  };

  return {
    handleFileUpload,
    fileTarget,
    biography,
    title,
    content,
    handleData,
  };
}
