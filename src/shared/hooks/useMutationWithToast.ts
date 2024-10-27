import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showToast } from '../components/toaster';

export const useMutationWithToast = <T>(params: {
    mutationFn: (data: T) => Promise<void>,
    invalidateKeys: ((string | number)[])[],
    successMessage: string
}) => {
    const queryClient = useQueryClient();
    const { mutationFn, invalidateKeys, successMessage } = params;

    return useMutation({
        mutationFn,
        onSuccess: async () => {
            await Promise.allSettled(invalidateKeys.map((queryKey) => (
                queryClient.invalidateQueries({ queryKey })
            )));
            showToast(successMessage, 1000);
        },
        onError: (err) => showToast(`error: ${err.message}`, 5000)
    });
};