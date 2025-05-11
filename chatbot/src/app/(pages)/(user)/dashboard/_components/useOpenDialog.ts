// useOpenDialog.ts
import { useRouter } from "next/navigation";

export const useOpenDialog = () => {
  const router = useRouter();

  return (type: 'delete' | 'status' | 'role', id: string | string[]) => {
    const params = new URLSearchParams();
    params.set('dialog', type);
    if (Array.isArray(id)) {
      params.set('id', id.join(','));
    } else {
      params.set('id', id);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };
};
