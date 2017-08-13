export const canDragAndDrop = (div) => (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
export const hasFormData = window => ('FormData' in window); 
export const hasFileReader = (window) => ('FileReader' in window); 
export const canAdvanceUpload = (div, window) => (canDragAndDrop(div) && hasFormData(window) && hasFileReader(window));

const setupAdvanceUpload = () => {
  const div = document.createElement('div');
  if (!canAdvanceUpload(div, window)) return;


}
