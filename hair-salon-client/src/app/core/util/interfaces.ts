export interface ModalConfig {
    title: string;
    message: string;
    confirmButtonVisible: boolean;
    cancelButtonVisible: boolean;
    confirmButtonAction: () => void
}