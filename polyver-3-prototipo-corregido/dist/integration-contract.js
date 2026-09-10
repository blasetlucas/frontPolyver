// Shared contract between the original Polyver shell and its chat module.
export const personIds = ['luciano', 'francisca', 'sofia'];
export const deityIds = ['dioniso', 'atenea', 'venus', 'hercules', 'persefone', 'apolo', 'dike', 'eleutheria', 'mercurio', 'marte', 'artemisa', 'hefesto'];
export const appRoutes = ['home', 'chat', 'connections', 'values', 'intellectual', 'intimate', 'agenda', 'date', 'partners', 'prepay', 'safety', 'profile', 'feedback'];
export function validSelection(value) {
  return !!value && personIds.includes(value.personId) && deityIds.includes(value.deityId);
}
export function personForProfile(profile) {
  if (personIds.includes(profile?.demoPerson)) return profile.demoPerson;
  const name = (profile?.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return personIds.includes(name) ? name : 'luciano';
}
export function profileForSelection(profile, selection) {
  if (!validSelection(selection)) return profile;
  if (personForProfile(profile) === selection.personId) return profile;
  const names = {luciano:'Luciano', francisca:'Francisca', sofia:'Sofía'};
  return {...profile, demoPerson:selection.personId, name:names[selection.personId], gender:selection.personId === 'luciano' ? 'Hombre' : 'Mujer'};
}
export function trustedMessage(event, source, origin) {
  return event.source === source && event.origin === origin;
}
