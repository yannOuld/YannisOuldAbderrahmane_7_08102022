import { ref } from "vue";

export function modal() {
  let isOpen = ref(false);
  let msgErr = ref("");
  let msgSucces = ref("");
  let closePopup;

  function showPopup() {
    {
      isOpen.value = true;
      clearTimeout(closePopup);

      closePopup = setTimeout(() => {
        msgErr.value = "";
        msgSucces.value = "";
        isOpen.value = false;
      }, 2000);
    }
  };

  return {
    isOpen,
    msgErr,
    msgSucces,
    showPopup,
  };
}
