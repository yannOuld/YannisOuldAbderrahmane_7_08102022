<script setup>
  import { ref } from "vue";
  import { useAdminStore } from "../../stores/admin";
  import UserAdmin from "./UserAdmin.vue";

  defineProps({
    users: {
      type: Array,
      required: true,
    },
  });

  const isOpen = ref(false);
  const targetUuid = ref(null);

  function OpenTarget(uuid) {
    isOpen.value = true;
    targetUuid.value = uuid;
  }

  const { deleteUser } = useAdminStore();

  async function suppUser(uuid) {
    await deleteUser(uuid);
  }
</script>

<template>
  <div>
    <ul class="admin-list" v-for="user in users" :key="user">
      <li class="admin-list_item">
        <span class="admin-list_id">
          <strong> uuid:</strong> {{ user.uuid }} <br />
          <strong> id:</strong>
          {{ user.id }}
        </span>
        <div class="admin-list_data justify-between">
          <img
            class="admin-list_img"
            :src="user.imageUrl"
            alt="image utilisateur"
          />
          <div class="admin-list_content">
            <p>
              {{ user.firstName }}
              <br />
              {{ user.lastName }}
              <br />
              bio: <br />
              {{ user.biography }}
            </p>
          </div>
        </div>
        <div class="flex-row">
          <button class="btn" @click="suppUser(user.uuid)">supprimer</button>
          <button class="btn" @click="OpenTarget(user.uuid)">modifier</button>
        </div>
      </li>
    </ul>
    <teleport to="body">
      <div class="likes-modal_bg fixed" v-if="isOpen">
        <button @click="isOpen = false" class="btn">quitter</button>
        <user-admin :uuid="targetUuid" />
      </div>
    </teleport>
  </div>
</template>
