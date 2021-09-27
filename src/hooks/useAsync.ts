import {useEffect, useState} from 'react';

export default function useAsync(
  callback: () => Promise<void>,
  executeInMount: boolean = false,
  dependencies: any[] = [],
) {
  const [isMounted, setIsMounted] = useState(true);

  const [loading, setLoading] = useState<boolean>(false);
  const handleLoading = (newLoading: boolean) => setLoading(newLoading);

  const handlePromise = async () => {
    handleLoading(true);
    await callback();
    if (isMounted) {
      handleLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const executePromise = async () => {
      await handlePromise();
    };
    if (executeInMount) {
      executePromise();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {loading, handlePromise};
}
