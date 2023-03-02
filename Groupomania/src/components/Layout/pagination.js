import { ref, computed } from 'vue';
import { usePostStore } from "../../stores/posts";
import { useUsersStore } from '../../stores/users';
import { useCommentStore } from '../../stores/comment';

export function pagination() {
    const currentPage = ref(1);
    const perPage = ref(7);

    const mapUser = () => {
        const store = useUsersStore();
        return Object.fromEntries(
            Object.keys(store).map((key) => [key, computed(() => store[key])])
        );
    }
    const mapPosts = () => {
        const store = usePostStore();
        return Object.fromEntries(
            Object.keys(store).map((key) => [key, computed(() => store[key])])
        );
    };
    const mapComments = () => {
        const store = useCommentStore();
        return Object.fromEntries(
            Object.keys(store).map((key) => [key, computed(() => store[key])])
        );
    };
    const range = computed(() => {
        let start = (currentPage.value - 1) * perPage.value;
        let end = start + perPage.value;
        return [start, end];
    });
    function onPageChange(page) {
        currentPage.value = page;
    }
    return { currentPage, mapUser, mapPosts, mapComments, range, onPageChange }
}