export type LanguageCode = 'es' | 'en' | 'fr' | 'de';
export const LANGUAGE_CODES: LanguageCode[] = ['es', 'en', 'fr', 'de'];

type TranslationMap = Record<LanguageCode, Record<string, string>>;
type LiteralValues = Record<LanguageCode, string>;

interface LiteralDefinition {
  key: string;
  values: LiteralValues;
}

const literal = (key: string, values: LiteralValues): LiteralDefinition => ({
  key,
  values
});

const LITERALS: LiteralDefinition[] = [
  // Navigation
  literal('nav.home', {
    es: 'Inicio',
    en: 'Home',
    fr: 'Accueil',
    de: 'Startseite'
  }),
  literal('nav.catalog', {
    es: 'Catalogo',
    en: 'Catalog',
    fr: 'Catalogue',
    de: 'Katalog'
  }),
  literal('nav.orders', {
    es: 'Pedidos',
    en: 'Orders',
    fr: 'Commandes',
    de: 'Bestellungen'
  }),
  literal('nav.cart', {
    es: 'Carrito',
    en: 'Cart',
    fr: 'Panier',
    de: 'Warenkorb'
  }),
  literal('nav.profile', {
    es: 'Perfil',
    en: 'Profile',
    fr: 'Profil',
    de: 'Profil'
  }),
  literal('nav.admin', {
    es: 'Administracion',
    en: 'Administration',
    fr: 'Administration',
    de: 'Verwaltung'
  }),

  // Header
  literal('header.badge', {
    es: 'Preparado para empresas',
    en: 'Enterprise ready',
    fr: 'Pret pour l\'entreprise',
    de: 'Bereit fuer Unternehmen'
  }),
  literal('header.search.placeholder', {
    es: 'Buscar productos, pedidos o usuarios',
    en: 'Search products, orders or users',
    fr: 'Rechercher produits, commandes ou utilisateurs',
    de: 'Produkte, Bestellungen oder Benutzer suchen'
  }),
  literal('header.search.noDescription', {
    es: 'Sin descripcion',
    en: 'No description',
    fr: 'Sans description',
    de: 'Keine Beschreibung'
  }),
  literal('header.results.products', {
    es: 'Productos',
    en: 'Products',
    fr: 'Produits',
    de: 'Produkte'
  }),
  literal('header.results.orders', {
    es: 'Pedidos',
    en: 'Orders',
    fr: 'Commandes',
    de: 'Bestellungen'
  }),
  literal('header.results.users', {
    es: 'Usuarios',
    en: 'Users',
    fr: 'Utilisateurs',
    de: 'Benutzer'
  }),
  literal('header.notifications.title', {
    es: 'Notificaciones',
    en: 'Notifications',
    fr: 'Notifications',
    de: 'Benachrichtigungen'
  }),
  literal('header.notifications.pendingLabel', {
    es: 'pendientes',
    en: 'pending',
    fr: 'en attente',
    de: 'ausstehend'
  }),
  literal('header.notifications.markAll', {
    es: 'Marcar como leidas',
    en: 'Mark all as read',
    fr: 'Tout marquer comme lu',
    de: 'Alle als gelesen markieren'
  }),
  literal('header.notifications.empty', {
    es: 'Sin notificaciones',
    en: 'No notifications yet',
    fr: 'Aucune notification',
    de: 'Keine Benachrichtigungen'
  }),
  literal('header.menu.profile', {
    es: 'Perfil',
    en: 'Profile',
    fr: 'Profil',
    de: 'Profil'
  }),
  literal('header.menu.admin', {
    es: 'Panel admin',
    en: 'Admin panel',
    fr: 'Panneau admin',
    de: 'Adminbereich'
  }),
  literal('header.menu.docs', {
    es: 'Documentacion',
    en: 'Documentation',
    fr: 'Documentation',
    de: 'Dokumentation'
  }),
  literal('header.menu.logout', {
    es: 'Cerrar sesion',
    en: 'Sign out',
    fr: 'Se deconnecter',
    de: 'Abmelden'
  }),
  literal('header.menu.role.fallback', {
    es: 'Visor',
    en: 'Viewer',
    fr: 'Lecteur',
    de: 'Betrachter'
  }),
  literal('header.user.defaultName', {
    es: 'Invitado',
    en: 'Guest',
    fr: 'Invite',
    de: 'Gast'
  }),
  literal('header.user.defaultEmail', {
    es: 'sin-email@portfolio.local',
    en: 'no-email@portfolio.local',
    fr: 'sans-email@portfolio.local',
    de: 'kein-email@portfolio.local'
  }),

  // Language selector
  literal('language.selector.label', {
    es: 'Idioma',
    en: 'Language',
    fr: 'Langue',
    de: 'Sprache'
  }),

  // Catalog
  literal('catalog.eyebrow', {
    es: 'Inventario activo',
    en: 'Active inventory',
    fr: 'Inventaire actif',
    de: 'Aktiver Bestand'
  }),
  literal('catalog.title', {
    es: 'Catalogo de productos',
    en: 'Product catalog',
    fr: 'Catalogue de produits',
    de: 'Produktkatalog'
  }),
  literal('catalog.description', {
    es: 'Consulta el inventario publicado por catalog-service y revisa precios, estado y etiquetas.',
    en: 'Browse the catalog-service inventory and review prices, status and tags.',
    fr: 'Consultez l\'inventaire publie par catalog-service et verifiez prix, etat et etiquettes.',
    de: 'Pruefe den vom catalog-service veroeffentlichten Bestand und kontrolliere Preise, Status und Tags.'
  }),
  literal('catalog.refresh', {
    es: 'Refrescar',
    en: 'Refresh',
    fr: 'Actualiser',
    de: 'Aktualisieren'
  }),
  literal('catalog.viewDetails', {
    es: 'Ver detalles',
    en: 'View details',
    fr: 'Voir les details',
    de: 'Details ansehen'
  }),
  literal('catalog.addToCart', {
    es: 'Anadir al carrito',
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    de: 'In den Warenkorb'
  }),
  literal('catalog.noDescription', {
    es: 'Sin descripcion disponible.',
    en: 'No description available.',
    fr: 'Aucune description disponible.',
    de: 'Keine Beschreibung verfuegbar.'
  }),
  literal('catalog.emptyState', {
    es: 'No se encontraron productos con ese criterio.',
    en: 'No products found for that filter.',
    fr: 'Aucun produit ne correspond au critere.',
    de: 'Keine Produkte fuer diese Suche gefunden.'
  }),
  literal('catalog.clearSearch', {
    es: 'Limpiar busqueda',
    en: 'Clear search',
    fr: 'Reinitialiser la recherche',
    de: 'Suche zuruecksetzen'
  }),
  literal('catalog.toast.added', {
    es: 'Producto anadido al carrito.',
    en: 'Product added to cart.',
    fr: 'Produit ajoute au panier.',
    de: 'Produkt zum Warenkorb hinzugefuegt.'
  }),

  // Cart
  literal('cart.eyebrow', {
    es: 'Checkout',
    en: 'Checkout',
    fr: 'Paiement',
    de: 'Checkout'
  }),
  literal('cart.title', {
    es: 'Carrito de compras',
    en: 'Shopping cart',
    fr: 'Panier',
    de: 'Warenkorb'
  }),
  literal('cart.description', {
    es: 'Revisa tus productos y confirma el pedido cuando estes listo.',
    en: 'Review your products and confirm the order when ready.',
    fr: 'Passez en revue vos produits et confirmez la commande.',
    de: 'Produkte pruefen und Bestellung bestaetigen.'
  }),
  literal('cart.total', {
    es: 'Importe total',
    en: 'Total amount',
    fr: 'Montant total',
    de: 'Gesamtbetrag'
  }),
  literal('cart.payment', {
    es: 'Proceder al pago',
    en: 'Proceed to payment',
    fr: 'Proceder au paiement',
    de: 'Zur Zahlung fortfahren'
  }),
  literal('cart.associatedUser', {
    es: 'El pedido se asociara a',
    en: 'The order will be linked to',
    fr: 'La commande sera associee a',
    de: 'Die Bestellung wird zugeordnet zu'
  }),
  literal('cart.empty', {
    es: 'Tu carrito esta vacio.',
    en: 'Your cart is empty.',
    fr: 'Votre panier est vide.',
    de: 'Dein Warenkorb ist leer.'
  }),
  literal('cart.goToCatalog', {
    es: 'Explorar catalogo',
    en: 'Browse catalog',
    fr: 'Voir le catalogue',
    de: 'Zum Katalog'
  }),
  literal('cart.quantity', {
    es: 'Cantidad',
    en: 'Quantity',
    fr: 'Quantite',
    de: 'Menge'
  }),
  literal('cart.lineTotal', {
    es: 'Total',
    en: 'Line total',
    fr: 'Total',
    de: 'Zwischensumme'
  }),
  literal('cart.remove', {
    es: 'Eliminar',
    en: 'Remove',
    fr: 'Supprimer',
    de: 'Entfernen'
  }),
  literal('cart.toast.missingUser', {
    es: 'No se pudo identificar al usuario actual.',
    en: 'The current user could not be identified.',
    fr: 'Impossible d\'identifier l\'utilisateur.',
    de: 'Aktueller Benutzer konnte nicht identifiziert werden.'
  }),
  literal('cart.toast.success', {
    es: 'Pedido creado correctamente.',
    en: 'Order created successfully.',
    fr: 'Commande creee avec succes.',
    de: 'Bestellung erfolgreich erstellt.'
  }),
  literal('cart.toast.error', {
    es: 'No se pudo procesar el pago. Intentalo nuevamente.',
    en: 'Payment could not be processed. Please try again.',
    fr: 'Impossible de traiter le paiement. Reessayez.',
    de: 'Zahlung konnte nicht verarbeitet werden. Bitte erneut versuchen.'
  }),

  // Orders
  literal('orders.eyebrow.admin', {
    es: 'Operaciones',
    en: 'Operations',
    fr: 'Operations',
    de: 'Operationen'
  }),
  literal('orders.eyebrow.user', {
    es: 'Mis compras',
    en: 'My purchases',
    fr: 'Mes achats',
    de: 'Meine Kaeufe'
  }),
  literal('orders.title.admin', {
    es: 'Pedidos',
    en: 'Orders',
    fr: 'Commandes',
    de: 'Bestellungen'
  }),
  literal('orders.title.user', {
    es: 'Historial de pedidos',
    en: 'Order history',
    fr: 'Historique des commandes',
    de: 'Bestellverlauf'
  }),
  literal('orders.description.admin', {
    es: 'Gestiona y monitorea todos los pedidos del ecosistema.',
    en: 'Manage and monitor every order in the ecosystem.',
    fr: 'Gerez et surveillez toutes les commandes.',
    de: 'Verwalte und ueberwache alle Bestellungen.'
  }),
  literal('orders.description.user', {
    es: 'Consulta el estado de tus compras y recibe actualizaciones.',
    en: 'Track your purchases and get updates.',
    fr: 'Suivez vos achats et recevez des mises a jour.',
    de: 'Verfolge deine Kaeufe und erhalte Updates.'
  }),
  literal('orders.button.new', {
    es: 'Nuevo pedido',
    en: 'New order',
    fr: 'Nouvelle commande',
    de: 'Neue Bestellung'
  }),
  literal('orders.button.cart', {
    es: 'Ir al carrito',
    en: 'Go to cart',
    fr: 'Aller au panier',
    de: 'Zum Warenkorb'
  }),
  literal('orders.search.placeholder', {
    es: 'Buscar por ID o usuario...',
    en: 'Search by ID or user...',
    fr: 'Rechercher par ID ou utilisateur...',
    de: 'Nach ID oder Benutzer suchen...'
  }),
  literal('orders.status.all', {
    es: 'Todos los estados',
    en: 'All statuses',
    fr: 'Tous les statuts',
    de: 'Alle Status'
  }),
  literal('orders.status.pending', {
    es: 'Pendiente',
    en: 'Pending',
    fr: 'En attente',
    de: 'Ausstehend'
  }),
  literal('orders.status.confirmed', {
    es: 'Confirmado',
    en: 'Confirmed',
    fr: 'Confirmee',
    de: 'Bestaetigt'
  }),
  literal('orders.status.shipped', {
    es: 'Enviado',
    en: 'Shipped',
    fr: 'Expediee',
    de: 'Versandt'
  }),
  literal('orders.status.delivered', {
    es: 'Entregado',
    en: 'Delivered',
    fr: 'Livree',
    de: 'Zugestellt'
  }),
  literal('orders.status.cancelled', {
    es: 'Cancelado',
    en: 'Cancelled',
    fr: 'Annulee',
    de: 'Storniert'
  }),
  literal('orders.bulk.clean', {
    es: 'Limpiar seleccion',
    en: 'Clear selection',
    fr: 'Effacer la selection',
    de: 'Auswahl loeschen'
  }),
  literal('orders.bulk.selectionLabel', {
    es: 'pedido(s) seleccionados',
    en: 'order(s) selected',
    fr: 'commande(s) selectionnee(s)',
    de: 'Bestellung(en) ausgewaehlt'
  }),
  literal('orders.table.order', {
    es: 'Pedido',
    en: 'Order',
    fr: 'Commande',
    de: 'Bestellung'
  }),
  literal('orders.table.user', {
    es: 'Usuario',
    en: 'Customer',
    fr: 'Utilisateur',
    de: 'Benutzer'
  }),
  literal('orders.table.status', {
    es: 'Estado',
    en: 'Status',
    fr: 'Statut',
    de: 'Status'
  }),
  literal('orders.table.total', {
    es: 'Total',
    en: 'Total',
    fr: 'Total',
    de: 'Gesamt'
  }),
  literal('orders.table.created', {
    es: 'Creado',
    en: 'Created',
    fr: 'Cree',
    de: 'Erstellt'
  }),
  literal('orders.table.actions', {
    es: 'Acciones',
    en: 'Actions',
    fr: 'Actions',
    de: 'Aktionen'
  }),
  literal('orders.table.view', {
    es: 'Ver detalle',
    en: 'View detail',
    fr: 'Voir le detail',
    de: 'Details ansehen'
  }),
  literal('orders.empty', {
    es: 'Sin pedidos para el criterio seleccionado.',
    en: 'No orders match the selected filters.',
    fr: 'Aucune commande ne correspond aux filtres.',
    de: 'Keine Bestellungen fuer diese Filter.'
  }),

  // Order detail
  literal('order.detail.title', {
    es: 'Pedido',
    en: 'Order',
    fr: 'Commande',
    de: 'Bestellung'
  }),
  literal('order.detail.customer', {
    es: 'Cliente',
    en: 'Customer',
    fr: 'Client',
    de: 'Kunde'
  }),
  literal('order.detail.total', {
    es: 'Total',
    en: 'Total',
    fr: 'Total',
    de: 'Gesamt'
  }),
  literal('order.detail.created', {
    es: 'Emitido el',
    en: 'Issued on',
    fr: 'Emis le',
    de: 'Erstellt am'
  }),
  literal('order.detail.items', {
    es: 'Productos',
    en: 'Products',
    fr: 'Produits',
    de: 'Artikel'
  }),
  literal('order.detail.productId', {
    es: 'ID',
    en: 'ID',
    fr: 'ID',
    de: 'ID'
  }),
  literal('order.detail.quantity', {
    es: 'Cantidad',
    en: 'Quantity',
    fr: 'Quantite',
    de: 'Menge'
  }),
  literal('order.detail.price', {
    es: 'Precio',
    en: 'Price',
    fr: 'Prix',
    de: 'Preis'
  }),
  literal('order.detail.userFallback', {
    es: 'Usuario',
    en: 'User',
    fr: 'Utilisateur',
    de: 'Benutzer'
  }),
  literal('order.detail.productFallback', {
    es: 'Producto',
    en: 'Product',
    fr: 'Produit',
    de: 'Produkt'
  })
];

export const TRANSLATIONS: TranslationMap = buildTranslationMap(LITERALS);

function buildTranslationMap(entries: LiteralDefinition[]): TranslationMap {
  const map = LANGUAGE_CODES.reduce((acc, code) => {
    acc[code] = {};
    return acc;
  }, {} as TranslationMap);

  for (const { key, values } of entries) {
    for (const code of LANGUAGE_CODES) {
      map[code][key] = values[code];
    }
  }
  return map;
}
