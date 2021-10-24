import {useCallback, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {TClose, TOpen} from 'react-native-modalize/lib/options';

function useModalize(open: TOpen = 'default', close: TClose = 'default') {
  const modalRef = useRef<Modalize>(null);

  const modalOpen = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.open(open);
    }
  }, [open]);

  const modalClose = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.close(close);
    }
  }, [close]);

  return {modalRef, modalOpen, modalClose};
}

export default useModalize;
