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
    es: 'Cat\u00E1logo',
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
    es: 'Administraci\u00F3n',
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
  literal('catalog.hideDetails', {
    es: 'Ocultar detalles',
    en: 'Hide details',
    fr: 'Masquer les details',
    de: 'Details ausblenden'
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

  // Catalog detail
  literal('catalog.detail.eyebrow', {
    es: 'Detalle del producto',
    en: 'Product details',
    fr: 'Détails du produit',
    de: 'Produktdetails'
  }),
  literal('catalog.detail.price', {
    es: 'Precio',
    en: 'Price',
    fr: 'Prix',
    de: 'Preis'
  }),
  literal('catalog.detail.lastUpdate', {
    es: 'Última actualización',
    en: 'Last updated',
    fr: 'Dernière mise à jour',
    de: 'Zuletzt aktualisiert'
  }),
  literal('catalog.detail.close', {
    es: 'Volver',
    en: 'Back',
    fr: 'Retour',
    de: 'Zurück'
  }),

  // Cart
  literal('cart.eyebrow', {
    es: 'Resumen de compra',
    en: 'Checkout summary',
    fr: 'R\u00E9capitulatif',
    de: 'Bestell\u00FCbersicht'
  }),
  literal('cart.title', {
    es: 'Carrito',
    en: 'Shopping cart',
    fr: 'Panier',
    de: 'Warenkorb'
  }),
  literal('cart.description', {
    es: 'Confirma cantidades, revisa totales y finaliza el pedido.',
    en: 'Confirm quantities, review totals and place the order.',
    fr: 'Confirmez les quantit\u00E9s, v\u00E9rifiez les totaux et validez la commande.',
    de: 'Mengen pr\u00FCfen, Summen kontrollieren und Bestellung abschlie\u00DFen.'
  }),
  literal('cart.meta.items', {
    es: 'Art\u00EDculos',
    en: 'Items',
    fr: 'Articles',
    de: 'Artikel'
  }),
  literal('cart.meta.amount', {
    es: 'Total estimado',
    en: 'Estimated total',
    fr: 'Total estim\u00E9',
    de: 'Gesch\u00E4tzter Gesamtbetrag'
  }),
  literal('cart.total', {
    es: 'Importe total',
    en: 'Total amount',
    fr: 'Montant total',
    de: 'Gesamtbetrag'
  }),
  literal('cart.payment', {
    es: 'Confirmar pedido',
    en: 'Place order',
    fr: 'Valider la commande',
    de: 'Bestellung abschicken'
  }),
  literal('cart.associatedUser', {
    es: 'Pedido asociado a',
    en: 'Order linked to',
    fr: 'Commande associ\u00E9e \u00E0',
    de: 'Bestellung zugeordnet zu'
  }),
  literal('cart.empty', {
    es: 'Tu carrito est\u00E1 vac\u00EDo.',
    en: 'Your cart is empty.',
    fr: 'Votre panier est vide.',
    de: 'Dein Warenkorb ist leer.'
  }),
  literal('cart.goToCatalog', {
    es: 'Volver al cat\u00E1logo',
    en: 'Back to catalog',
    fr: 'Retour au catalogue',
    de: 'Zur\u00FCck zum Katalog'
  }),
  literal('cart.quantity', {
    es: 'Cantidad',
    en: 'Quantity',
    fr: 'Quantit\u00E9',
    de: 'Menge'
  }),
  literal('cart.lineTotal', {
    es: 'Total de la l\u00EDnea',
    en: 'Line total',
    fr: 'Total de la ligne',
    de: 'Zeilensumme'
  }),
  literal('cart.remove', {
    es: 'Eliminar del carrito',
    en: 'Remove from cart',
    fr: 'Retirer du panier',
    de: 'Aus dem Warenkorb entfernen'
  }),
  literal('cart.items.heading', {
    es: 'Productos en el carrito',
    en: 'Cart items',
    fr: 'Produits du panier',
    de: 'Artikel im Warenkorb'
  }),
  literal('cart.items.countLabel', {
    es: 'art\u00EDculos',
    en: 'items',
    fr: 'articles',
    de: 'Artikel'
  }),
  literal('cart.summary.title', {
    es: 'Resumen',
    en: 'Summary',
    fr: 'R\u00E9capitulatif',
    de: '\u00DCbersicht'
  }),
  literal('cart.summary.subtotal', {
    es: 'Subtotal',
    en: 'Subtotal',
    fr: 'Sous-total',
    de: 'Zwischensumme'
  }),
  literal('cart.summary.taxes', {
    es: 'Impuestos (IVA 21%)',
    en: 'Taxes (VAT 21%)',
    fr: 'Taxes (TVA 21%)',
    de: 'Steuern (MwSt. 21 %)'
  }),
  literal('cart.summary.total', {
    es: 'Total a pagar',
    en: 'Amount due',
    fr: 'Montant \u00E0 payer',
    de: 'Zu zahlender Betrag'
  }),
  literal('cart.summary.disclaimer', {
    es: 'Los montos se recalculan al confirmar el pedido.',
    en: 'Totals are recalculated when the order is confirmed.',
    fr: 'Les montants sont recalcul\u00E9s lors de la confirmation.',
    de: 'Summen werden bei der Best\u00E4tigung neu berechnet.'
  }),
  literal('cart.customer.title', {
    es: 'Datos de facturaci\u00F3n',
    en: 'Billing details',
    fr: 'Informations de facturation',
    de: 'Rechnungsinformationen'
  }),
  literal('cart.customer.email', {
    es: 'Correo',
    en: 'Email',
    fr: 'Courriel',
    de: 'E-Mail'
  }),
  literal('cart.customer.role', {
    es: 'Roles',
    en: 'Roles',
    fr: 'R\u00F4les',
    de: 'Rollen'
  }),
  literal('cart.customer.manage', {
    es: 'Gestionar perfil',
    en: 'Manage profile',
    fr: 'G\u00E9rer le profil',
    de: 'Profil verwalten'
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
    fr: 'Commande cr\u00E9\u00E9e avec succ\u00E8s.',
    de: 'Bestellung erfolgreich erstellt.'
  }),
  literal('cart.toast.error', {
    es: 'No se pudo procesar el pago. Int\u00E9ntalo nuevamente.',
    en: 'Payment could not be processed. Please try again.',
    fr: 'Impossible de traiter le paiement. R\u00E9essayez.',
    de: 'Zahlung konnte nicht verarbeitet werden. Bitte erneut versuchen.'
  }),

  // Orders
  literal('orders.eyebrow.admin', {
    es: 'Operaciones',
    en: 'Operations',
    fr: 'Op\u00E9rations',
    de: 'Operationen'
  }),
  literal('orders.eyebrow.user', {
    es: 'Mis compras',
    en: 'My purchases',
    fr: 'Mes achats',
    de: 'Meine K\u00E4ufe'
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
    fr: 'G\u00E9rez et surveillez toutes les commandes de l\u2019\u00E9cosyst\u00E8me.',
    de: 'Verwalte und \u00FCberwache alle Bestellungen im gesamten System.'
  }),
  literal('orders.description.user', {
    es: 'Consulta el estado de tus compras y recibe actualizaciones.',
    en: 'Track your purchases and receive updates.',
    fr: 'Suivez vos achats et recevez des mises \u00E0 jour.',
    de: 'Verfolge deine K\u00E4ufe und erhalte Updates.'
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
    es: 'Buscar pedido o usuario',
    en: 'Search order or user',
    fr: 'Rechercher une commande ou un utilisateur',
    de: 'Bestellung oder Benutzer suchen'
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
    fr: 'Confirm\u00E9',
    de: 'Best\u00E4tigt'
  }),
  literal('orders.status.shipped', {
    es: 'Enviado',
    en: 'Shipped',
    fr: 'Exp\u00E9di\u00E9',
    de: 'Versandt'
  }),
  literal('orders.status.delivered', {
    es: 'Entregado',
    en: 'Delivered',
    fr: 'Livr\u00E9',
    de: 'Zugestellt'
  }),
  literal('orders.status.cancelled', {
    es: 'Cancelado',
    en: 'Cancelled',
    fr: 'Annul\u00E9',
    de: 'Storniert'
  }),
  literal('orders.bulk.selectionLabel', {
    es: 'pedido(s) seleccionados',
    en: 'order(s) selected',
    fr: 'commande(s) s\u00E9lectionn\u00E9e(s)',
    de: 'Bestellung(en) ausgew\u00E4hlt'
  }),
  literal('orders.bulk.clean', {
    es: 'Limpiar selecci\u00F3n',
    en: 'Clear selection',
    fr: 'Effacer la s\u00E9lection',
    de: 'Auswahl l\u00F6schen'
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
    de: 'Kunde'
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
    fr: 'Cr\u00E9\u00E9',
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
    fr: 'Voir le d\u00E9tail',
    de: 'Details ansehen'
  }),
  literal('orders.table.userEmailFallback', {
    es: 'Sin correo registrado',
    en: 'No email on record',
    fr: 'Aucun courriel disponible',
    de: 'Keine E-Mail vorhanden'
  }),
  literal('orders.empty', {
    es: 'Sin pedidos para el criterio seleccionado.',
    en: 'No orders match the selected filters.',
    fr: 'Aucune commande ne correspond aux filtres.',
    de: 'Keine Bestellungen f\u00FCr diese Filter.'
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
    fr: '\u00C9mis le',
    de: 'Erstellt am'
  }),
  literal('order.detail.items', {
    es: 'Productos',
    en: 'Products',
    fr: 'Produits',
    de: 'Artikel'
  }),
  literal('order.detail.quantity', {
    es: 'Cantidad',
    en: 'Quantity',
    fr: 'Quantit\u00E9',
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
,

  // Admin module
  literal('admin.eyebrow', {
    es: 'Administración',
    en: 'Administration',
    fr: 'Administration',
    de: 'Verwaltung'
  }),
  literal('admin.title', {
    es: 'Centro de control',
    en: 'Control Center',
    fr: 'Centre de contrôle',
    de: 'Kontrollzentrum'
  }),
  literal('admin.button.openModule', {
    es: 'Abrir módulo',
    en: 'Open module',
    fr: 'Ouvrir le module',
    de: 'Modul öffnen'
  }),
  literal('home.catalog.eyebrow', {
    es: 'Catálogo',
    en: 'Catalog',
    fr: 'Catalogue',
    de: 'Katalog'
  }),
  literal('home.catalog.button.open', {
    es: 'Abrir catálogo',
    en: 'Open catalog',
    fr: 'Ouvrir le catalogue',
    de: 'Katalog öffnen'
  }),
  literal('home.link.button.openGuide', {
    es: 'Abrir guía',
    en: 'Open guide',
    fr: 'Ouvrir le guide',
    de: 'Anleitung öffnen'
  }),
  literal('home.link.button.openSection', {
    es: 'Abrir sección',
    en: 'Open section',
    fr: 'Ouvrir la section',
    de: 'Abschnitt öffnen'
  }),
  literal('profile.breadcrumb.catalog', {
    es: 'Catálogo',
    en: 'Catalog',
    fr: 'Catalogue',
    de: 'Katalog'
  }),
  literal('profile.security.lastUpdate', {
    es: 'Última actualización',
    en: 'Last updated',
    fr: 'Dernière mise à jour',
    de: 'Zuletzt aktualisiert'
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
