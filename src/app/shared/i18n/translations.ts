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
  literal('header.results.orders.itemTitle', {
    es: 'Pedido reciente',
    en: 'Recent order',
    fr: 'Commande récente',
    de: 'Letzte Bestellung'
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
  literal('header.nav.openMenu', {
    es: 'Abrir menu',
    en: 'Open menu',
    fr: 'Ouvrir le menu',
    de: 'Menue oeffnen'
  }),
  literal('header.nav.closeMenu', {
    es: 'Cerrar menu',
    en: 'Close menu',
    fr: 'Fermer le menu',
    de: 'Menue schliessen'
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

  // Common helpers
  literal('common.back', {
    es: 'Volver',
    en: 'Go back',
    fr: 'Retour',
    de: 'Zurück'
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
  literal('catalog.products.api-gateway.name', {
    es: 'Gateway reactivo con Spring Cloud',
    en: 'Reactive gateway with Spring Cloud',
    fr: 'Passerelle reactive avec Spring Cloud',
    de: 'Reaktives Gateway mit Spring Cloud'
  }),
  literal('catalog.products.api-gateway.description', {
    es: 'Unifica rutas, resiliencia y token relay para microservicios seguros.',
    en: 'Unifies routing, resilience and token relay for secure microservices.',
    fr: 'Unifie routage, resilience et token relay pour microservices securises.',
    de: 'Vereint Routing, Resilienz und Token Relay fuer sichere Microservices.'
  }),
  literal('catalog.products.orders-engine.name', {
    es: 'Motor de pedidos resilient',
    en: 'Resilient orders engine',
    fr: 'Moteur de commandes resilient',
    de: 'Resilienter Bestellmotor'
  }),
  literal('catalog.products.orders-engine.description', {
    es: 'Incluye validaciones cruzadas y cálculo de totales con WebClient.',
    en: 'Includes cross-service validation and total calculation with WebClient.',
    fr: 'Inclut validations croisées et calculs avec WebClient.',
    de: 'Enthält Querverifizierungen und Betragsermittlung via WebClient.'
  }),
  literal('catalog.products.users-registry.name', {
    es: 'Registro de identidades clave',
    en: 'Key identity registry',
    fr: 'Registre d’identités clé',
    de: 'Zentrale Identity Registry'
  }),
  literal('catalog.products.users-registry.description', {
    es: 'Sincroniza usuarios, roles y cuentas de servicio con Keycloak.',
    en: 'Synchronizes users, roles and service accounts with Keycloak.',
    fr: 'Synchronise utilisateurs, rôles et comptes de service avec Keycloak.',
    de: 'Synchronisiert Benutzer, Rollen und Servicekonten mit Keycloak.'
  }),
  literal('catalog.detail.close', {
    es: 'Volver',
    en: 'Back',
    fr: 'Retour',
    de: 'Zurück'
  }),
  literal('catalog.admin.eyebrow', {
    es: 'Gestión catalog-service',
    en: 'Catalog governance',
    fr: 'Gouvernance du catalogue',
    de: 'Catalog Governance'
  }),
  literal('catalog.admin.title', {
    es: 'Crear y mantener productos',
    en: 'Create and maintain products',
    fr: 'Créer et maintenir les produits',
    de: 'Produkte erstellen und pflegen'
  }),
  literal('catalog.admin.description', {
    es: 'Publica ítems, ajusta inventario y marca el estado que verán los recruiters en la demo.',
    en: 'Publish items, adjust inventory and control what recruiters see during the demo.',
    fr: 'Publiez des éléments, ajustez l’inventaire et contrôlez ce que voient les recruteurs.',
    de: 'Veröffentliche Artikel, passe den Bestand an und steuere, was Recruiter sehen.'
  }),
  literal('catalog.admin.manage', {
    es: 'Gestionar catálogo',
    en: 'Manage catalog',
    fr: 'Gérer le catalogue',
    de: 'Katalog verwalten'
  }),
  literal('catalog.admin.form.createTitle', {
    es: 'Nuevo producto',
    en: 'New product',
    fr: 'Nouveau produit',
    de: 'Neues Produkt'
  }),
  literal('catalog.admin.form.editTitle', {
    es: 'Editar producto',
    en: 'Edit product',
    fr: 'Modifier le produit',
    de: 'Produkt bearbeiten'
  }),
  literal('catalog.admin.form.fields.name', {
    es: 'Nombre',
    en: 'Name',
    fr: 'Nom',
    de: 'Name'
  }),
  literal('catalog.admin.form.fields.sku', {
    es: 'SKU',
    en: 'SKU',
    fr: 'SKU',
    de: 'SKU'
  }),
  literal('catalog.admin.form.fields.price', {
    es: 'Precio',
    en: 'Price',
    fr: 'Prix',
    de: 'Preis'
  }),
  literal('catalog.admin.form.fields.currency', {
    es: 'Moneda',
    en: 'Currency',
    fr: 'Devise',
    de: 'Währung'
  }),
  literal('catalog.admin.form.fields.stock', {
    es: 'Inventario',
    en: 'Inventory',
    fr: 'Inventaire',
    de: 'Bestand'
  }),
  literal('catalog.admin.form.fields.tags', {
    es: 'Etiquetas (separadas por coma)',
    en: 'Tags (comma separated)',
    fr: 'Étiquettes (séparées par des virgules)',
    de: 'Tags (durch Komma getrennt)'
  }),
  literal('catalog.admin.form.fields.description', {
    es: 'Descripción',
    en: 'Description',
    fr: 'Description',
    de: 'Beschreibung'
  }),
  literal('catalog.admin.form.reset', {
    es: 'Limpiar',
    en: 'Reset form',
    fr: 'Réinitialiser',
    de: 'Zurücksetzen'
  }),
  literal('catalog.admin.form.create', {
    es: 'Crear producto',
    en: 'Create product',
    fr: 'Créer le produit',
    de: 'Produkt anlegen'
  }),
  literal('catalog.admin.form.update', {
    es: 'Actualizar producto',
    en: 'Update product',
    fr: 'Mettre à jour le produit',
    de: 'Produkt aktualisieren'
  }),
  literal('catalog.admin.list.title', {
    es: 'Productos publicados',
    en: 'Published products',
    fr: 'Produits publiés',
    de: 'Veröffentlichte Produkte'
  }),
  literal('catalog.admin.list.description', {
    es: 'Controla inventario, estado y precios que consumen otros microservicios.',
    en: 'Control inventory, state and pricing consumed by other microservices.',
    fr: 'Contrôlez inventaire, état et prix utilisés par les microservices.',
    de: 'Steuere Bestand, Status und Preise für andere Microservices.'
  }),
  literal('catalog.admin.list.stock', {
    es: 'Inventario',
    en: 'Stock',
    fr: 'Stock',
    de: 'Bestand'
  }),
  literal('catalog.admin.list.status.active', {
    es: 'Activo',
    en: 'Active',
    fr: 'Actif',
    de: 'Aktiv'
  }),
  literal('catalog.admin.list.status.inactive', {
    es: 'Inactivo',
    en: 'Inactive',
    fr: 'Inactif',
    de: 'Inaktiv'
  }),
  literal('catalog.admin.list.actions.edit', {
    es: 'Editar',
    en: 'Edit',
    fr: 'Modifier',
    de: 'Bearbeiten'
  }),
  literal('catalog.admin.list.actions.activate', {
    es: 'Activar',
    en: 'Activate',
    fr: 'Activer',
    de: 'Aktivieren'
  }),
  literal('catalog.admin.list.actions.deactivate', {
    es: 'Desactivar',
    en: 'Deactivate',
    fr: 'Désactiver',
    de: 'Deaktivieren'
  }),
  literal('catalog.admin.list.empty', {
    es: 'Todavía no hay productos publicados.',
    en: 'There are no products yet.',
    fr: 'Aucun produit pour le moment.',
    de: 'Noch keine Produkte vorhanden.'
  }),
  literal('catalog.admin.notifications.created', {
    es: 'Producto creado correctamente.',
    en: 'Product created successfully.',
    fr: 'Produit créé avec succès.',
    de: 'Produkt erfolgreich erstellt.'
  }),
  literal('catalog.admin.notifications.updated', {
    es: 'Producto actualizado.',
    en: 'Product updated.',
    fr: 'Produit mis à jour.',
    de: 'Produkt aktualisiert.'
  }),
  literal('catalog.admin.notifications.statusUpdated', {
    es: 'Estado del producto actualizado.',
    en: 'Product status updated.',
    fr: 'Statut du produit mis à jour.',
    de: 'Produktstatus aktualisiert.'
  }),
  literal('catalog.admin.notifications.saveError', {
    es: 'No se pudo guardar el producto.',
    en: 'Could not save product.',
    fr: 'Impossible d’enregistrer le produit.',
    de: 'Produkt konnte nicht gespeichert werden.'
  }),
  literal('catalog.admin.notifications.loadError', {
    es: 'No se pudo cargar el inventario.',
    en: 'Could not load inventory.',
    fr: 'Impossible de charger l’inventaire.',
    de: 'Inventar konnte nicht geladen werden.'
  }),
  literal('catalog.admin.notifications.invalidForm', {
    es: 'Completa los campos obligatorios antes de guardar.',
    en: 'Please fill out the required fields before saving.',
    fr: 'Veuillez remplir les champs obligatoires avant d’enregistrer.',
    de: 'Bitte fülle vor dem Speichern alle Pflichtfelder aus.'
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
  literal('cart.quantity.aria.group', {
    es: 'Control de cantidad en el carrito',
    en: 'Cart quantity selector',
    fr: 'S\u00E9lecteur de quantit\u00E9 du panier',
    de: 'Mengenauswahl f\u00FCr den Warenkorb'
  }),
  literal('cart.quantity.aria.decrease', {
    es: 'Reducir cantidad',
    en: 'Decrease quantity',
    fr: 'R\u00E9duire la quantit\u00E9',
    de: 'Menge verringern'
  }),
  literal('cart.quantity.aria.increase', {
    es: 'Aumentar cantidad',
    en: 'Increase quantity',
    fr: 'Augmenter la quantit\u00E9',
    de: 'Menge erh\u00F6hen'
  }),
  literal('cart.lineTotal', {
    es: 'Total',
    en: 'Total',
    fr: 'Total',
    de: 'Gesamtsumme'
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
  literal('orders.create.eyebrow', {
    es: 'Flujo guiado',
    en: 'Guided flow',
    fr: 'Parcours guid\u00E9',
    de: 'Gef\u00FChrter Ablauf'
  }),
  literal('orders.create.title', {
    es: 'Crear pedido manual',
    en: 'Create order manually',
    fr: 'Cr\u00E9er une commande manuelle',
    de: 'Bestellung manuell erstellen'
  }),
  literal('orders.create.description', {
    es: 'Utiliza este formulario para simular una compra desde el backoffice validando usuarios, productos y cantidades.',
    en: 'Use this form to simulate a purchase from the back office while validating users, products, and quantities.',
    fr: 'Utilisez ce formulaire pour simuler un achat depuis le back-office en validant utilisateurs, produits et quantit\u00E9s.',
    de: 'Mit diesem Formular simulieren Sie einen Kauf im Backoffice und validieren Benutzer, Produkte und Mengen.'
  }),
  literal('orders.create.customer.eyebrow', {
    es: 'Cliente',
    en: 'Customer',
    fr: 'Client',
    de: 'Kunde'
  }),
  literal('orders.create.customer.title', {
    es: 'Datos del comprador',
    en: 'Buyer information',
    fr: 'Informations acheteur',
    de: 'Kundendaten'
  }),
  literal('orders.create.customer.helper', {
    es: 'Selecciona un usuario demo o usa tu propia sesi\u00F3n para asignar el pedido.',
    en: 'Select a demo user or reuse your current session to assign the order.',
    fr: 'S\u00E9lectionnez un utilisateur de d\u00E9mo ou utilisez votre session pour attribuer la commande.',
    de: 'W\u00E4hlen Sie einen Demo-Benutzer oder verwenden Sie Ihre aktuelle Sitzung, um die Bestellung zuzuweisen.'
  }),
  literal('orders.create.customer.hintMatch', {
    es: 'Pedido asociado a tu sesi\u00F3n actual.',
    en: 'Order linked to your current session.',
    fr: 'Commande li\u00E9e \u00E0 votre session actuelle.',
    de: 'Bestellung mit Ihrer aktuellen Sitzung verkn\u00FCpft.'
  }),
  literal('orders.create.customer.hintChoose', {
    es: 'Selecciona cualquier usuario demo para simular la compra.',
    en: 'Select any demo user to simulate the purchase.',
    fr: 'S\u00E9lectionnez n\u2019importe quel utilisateur de d\u00E9mo pour simuler l\u2019achat.',
    de: 'W\u00E4hlen Sie einen Demo-Benutzer, um den Kauf zu simulieren.'
  }),
  literal('orders.create.fields.userLabel', {
    es: 'Usuario del pedido',
    en: 'Order user',
    fr: 'Utilisateur de la commande',
    de: 'Benutzer der Bestellung'
  }),
  literal('orders.create.items.title', {
    es: 'Productos y cantidades',
    en: 'Products and quantities',
    fr: 'Produits et quantit\u00E9s',
    de: 'Produkte und Mengen'
  }),
  literal('orders.create.items.helper', {
    es: 'Agrega tantas l\u00EDneas como necesites; actualizamos precios y totales autom\u00E1ticamente.',
    en: 'Add as many lines as you need\u2014prices and totals update automatically.',
    fr: 'Ajoutez autant de lignes que n\u00E9cessaire, les prix et totaux se mettent \u00E0 jour automatiquement.',
    de: 'F\u00FCgen Sie beliebig viele Positionen hinzu; Preise und Summen werden automatisch aktualisiert.'
  }),
  literal('orders.create.fields.productLabel', {
    es: 'Producto',
    en: 'Product',
    fr: 'Produit',
    de: 'Produkt'
  }),
  literal('orders.create.fields.quantityLabel', {
    es: 'Cantidad',
    en: 'Quantity',
    fr: 'Quantit\u00E9',
    de: 'Menge'
  }),
  literal('orders.create.fields.priceLabel', {
    es: 'Precio estimado',
    en: 'Estimated price',
    fr: 'Prix estim\u00E9',
    de: 'Gesch\u00E4tzter Preis'
  }),
  literal('orders.create.items.remove', {
    es: 'Eliminar producto',
    en: 'Remove product',
    fr: 'Supprimer le produit',
    de: 'Produkt entfernen'
  }),
  literal('orders.create.actions.addItem', {
    es: 'Agregar producto',
    en: 'Add product',
    fr: 'Ajouter un produit',
    de: 'Produkt hinzuf\u00FCgen'
  }),
  literal('orders.create.actions.submit', {
    es: 'Guardar pedido',
    en: 'Save order',
    fr: 'Enregistrer la commande',
    de: 'Bestellung speichern'
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
  literal('order.detail.eyebrow', {
    es: 'Seguimiento del pedido',
    en: 'Order tracking',
    fr: 'Suivi de commande',
    de: 'Bestellverfolgung'
  }),
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
  literal('admin.description', {
    es: 'Operaciones admin centralizadas para microservicios, datos maestros y pipelines listos para demo.',
    en: 'Centralized admin operations for microservices, master data and interview-ready pipelines.',
    fr: 'Operations admin centralisees pour microservices, donnees maitre et pipelines prets pour les entretiens.',
    de: 'Zentrale Adminaufgaben fuer Microservices, Stammdaten und vorfuehrbereite Pipelines.'
  }),
  literal('admin.button.openModule', {
    es: 'Abrir módulo',
    en: 'Open module',
    fr: 'Ouvrir le module',
    de: 'Modul öffnen'
  }),
  literal('admin.sections.users.title', {
    es: 'Usuarios y roles',
    en: 'Users & roles',
    fr: 'Utilisateurs et roles',
    de: 'Benutzer und Rollen'
  }),
  literal('admin.sections.users.description', {
    es: 'Administra usuarios, sincroniza roles y audita integraciones con Keycloak.',
    en: 'Manage business users, sync roles and audit integrations with Keycloak.',
    fr: 'Gerer les utilisateurs, synchroniser les roles et auditer les integrations avec Keycloak.',
    de: 'Verwalte Benutzer, synchronisiere Rollen und pruefe Integrationen mit Keycloak.'
  }),
  literal('admin.sections.catalog.title', {
    es: 'Catálogo',
    en: 'Catalog',
    fr: 'Catalogue',
    de: 'Katalog'
  }),
  literal('admin.sections.catalog.description', {
    es: 'Publica precios, dispara eventos Kafka y mantiene índices Elasticsearch listos para buscar.',
    en: 'Publish pricing, trigger Kafka events and keep Elasticsearch indexes searchable.',
    fr: 'Publier les prix, declencher des evenements Kafka et garder les index Elasticsearch exploitables.',
    de: 'Preise pflegen, Kafka-Ereignisse auslösen und Elasticsearch-Indizes suchbereit halten.'
  }),
  literal('admin.sections.orders.title', {
    es: 'Pedidos y cumplimiento',
    en: 'Orders & fulfillment',
    fr: 'Commandes et execution',
    de: 'Bestellungen und Abwicklung'
  }),
  literal('admin.sections.orders.description', {
    es: 'Supervisa estados, lanza reintentos y valida integraciones con users-service y catalog-service.',
    en: 'Monitor statuses, trigger retries and validate integrations with users and catalog services.',
    fr: 'Suivre les statuts, relancer les integrations et valider les services utilisateurs et catalogue.',
    de: 'Status überwachen, Wiederholungen anstoßen und Integrationen zu User- und Catalog-Services prüfen.'
  }),
  literal('admin.sections.observability.title', {
    es: 'Observabilidad',
    en: 'Observability',
    fr: 'Observabilite',
    de: 'Observability'
  }),
  literal('admin.sections.observability.description', {
    es: 'Paneles de Prometheus, Grafana y Keycloak listos para auditoría.',
    en: 'Prometheus, Grafana and Keycloak dashboards that are audit-ready.',
    fr: 'Tableaux de bord Prometheus, Grafana et Keycloak prets pour les audits.',
    de: 'Prometheus-, Grafana- und Keycloak-Dashboards bereit fuer Audits.'
  }),
  literal('users.detail.eyebrow', {
    es: 'Usuarios y roles',
    en: 'Users & roles',
    fr: 'Utilisateurs et roles',
    de: 'Benutzer und Rollen'
  }),
  literal('users.detail.contact', {
    es: 'Contacto y credenciales',
    en: 'Contact & credentials',
    fr: 'Contact et identifiants',
    de: 'Kontakt & Zugangsdaten'
  }),
  literal('users.detail.roles', {
    es: 'Roles asignados',
    en: 'Assigned roles',
    fr: 'Roles attribues',
    de: 'Zugewiesene Rollen'
  }),
  literal('users.detail.roles.empty', {
    es: 'Sin roles asignados',
    en: 'No roles assigned',
    fr: 'Aucun role attribue',
    de: 'Keine Rollen zugewiesen'
  }),
  literal('users.detail.roles.addPlaceholder', {
    es: 'Ej: catalog_read',
    en: 'e.g. catalog_read',
    fr: 'ex: catalog_read',
    de: 'z.B. catalog_read'
  }),
  literal('users.detail.roles.addButton', {
    es: 'Añadir',
    en: 'Add',
    fr: 'Ajouter',
    de: 'Hinzufügen'
  }),
  literal('users.detail.roles.reset', {
    es: 'Restablecer',
    en: 'Reset',
    fr: 'Réinitialiser',
    de: 'Zurücksetzen'
  }),
  literal('users.detail.roles.save', {
    es: 'Guardar roles',
    en: 'Save roles',
    fr: 'Enregistrer les roles',
    de: 'Rollen speichern'
  }),
  literal('users.detail.roles.saving', {
    es: 'Guardando...',
    en: 'Saving...',
    fr: 'Enregistrement...',
    de: 'Speichern...'
  }),
  literal('users.detail.roles.helper', {
    es: 'Los cambios se sincronizan con Keycloak y servicios federados.',
    en: 'Changes sync with Keycloak and federated services.',
    fr: 'Les changements sont synchronises avec Keycloak et les services federes.',
    de: 'Änderungen werden mit Keycloak und angebundenen Services synchronisiert.'
  }),
  literal('users.detail.roles.remove', {
    es: 'Quitar rol',
    en: 'Remove role',
    fr: 'Supprimer le role',
    de: 'Rolle entfernen'
  }),
  literal('users.detail.roles.saved', {
    es: 'Roles actualizados.',
    en: 'Roles updated.',
    fr: 'Roles mis à jour.',
    de: 'Rollen aktualisiert.'
  }),
  literal('users.detail.roles.error', {
    es: 'No se pudo actualizar los roles.',
    en: 'Could not update roles.',
    fr: 'Impossible de mettre à jour les roles.',
    de: 'Rollen konnten nicht aktualisiert werden.'
  }),
  literal('users.detail.realm', {
    es: 'Realm',
    en: 'Realm',
    fr: 'Realm',
    de: 'Realm'
  }),
  literal('users.detail.keycloak', {
    es: 'Cuenta Keycloak',
    en: 'Keycloak account',
    fr: 'Compte Keycloak',
    de: 'Keycloak-Konto'
  }),
  literal('users.detail.status.active', {
    es: 'Activo',
    en: 'Active',
    fr: 'Actif',
    de: 'Aktiv'
  }),
  literal('users.detail.status.inactive', {
    es: 'Inactivo',
    en: 'Inactive',
    fr: 'Inactif',
    de: 'Inaktiv'
  }),
  literal('users.detail.created', {
    es: 'Registrado el',
    en: 'Registered on',
    fr: 'Enregistre le',
    de: 'Registriert am'
  }),
  literal('users.list.eyebrow', {
    es: 'Gobernanza de identidades',
    en: 'Identity governance',
    fr: 'Gouvernance des identites',
    de: 'Identity Governance'
  }),
  literal('users.list.title', {
    es: 'Usuarios y roles federados',
    en: 'Federated users & roles',
    fr: 'Utilisateurs federes et roles',
    de: 'Föderierte Benutzer und Rollen'
  }),
  literal('users.list.description', {
    es: 'Valida cuentas sincronizadas con Keycloak, estados activos y permisos listos para auditoria.',
    en: 'Validate Keycloak-synced accounts, active states and audit-ready permissions.',
    fr: 'Validez les comptes synchronises avec Keycloak, les etats actifs et les permissions auditees.',
    de: 'Pruefe Keycloak-synchronisierte Konten, aktive Stati und auditfaehige Berechtigungen.'
  }),
  literal('users.list.metrics.total', {
    es: 'Usuarios totales',
    en: 'Total users',
    fr: 'Utilisateurs totaux',
    de: 'Gesamtbenutzer'
  }),
  literal('users.list.metrics.active', {
    es: 'Activos',
    en: 'Active',
    fr: 'Actifs',
    de: 'Aktive'
  }),
  literal('users.list.metrics.pending', {
    es: 'Pendientes',
    en: 'Pending',
    fr: 'En attente',
    de: 'Ausstehend'
  }),
  literal('users.list.status.active', {
    es: 'Activo',
    en: 'Active',
    fr: 'Actif',
    de: 'Aktiv'
  }),
  literal('users.list.status.inactive', {
    es: 'Inactivo',
    en: 'Inactive',
    fr: 'Inactif',
    de: 'Inaktiv'
  }),
  literal('users.list.actions.view', {
    es: 'Ver perfil',
    en: 'View profile',
    fr: 'Voir le profil',
    de: 'Profil anzeigen'
  }),
  literal('users.list.empty', {
    es: 'No hay usuarios registrados todavía.',
    en: 'No users registered yet.',
    fr: 'Aucun utilisateur pour le moment.',
    de: 'Noch keine Benutzer vorhanden.'
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
  literal('home.hero.eyebrow', {
    es: 'Resumen general',
    en: 'General overview',
    fr: 'Vue d’ensemble',
    de: 'Gesamtübersicht'
  }),
  literal('home.hero.greeting', {
    es: 'Hola',
    en: 'Hello',
    fr: 'Bonjour',
    de: 'Hallo'
  }),
  literal('home.hero.description', {
    es: 'Microservicios + Keycloak + Gateway listos para entrevistas enterprise.',
    en: 'Microservices + Keycloak + Gateway ready for enterprise interviews.',
    fr: 'Microservices + Keycloak + passerelle prêts pour les entretiens.',
    de: 'Microservices + Keycloak + Gateway – bereit für Enterprise-Interviews.'
  }),
  literal('home.hero.cta.newProduct', {
    es: 'Nuevo producto',
    en: 'New product',
    fr: 'Nouveau produit',
    de: 'Neues Produkt'
  }),
  literal('home.hero.cta.createOrder', {
    es: 'Crear pedido',
    en: 'Create order',
    fr: 'Créer commande',
    de: 'Bestellung anlegen'
  }),
  literal('home.hero.cta.adminPanel', {
    es: 'Panel admin',
    en: 'Admin panel',
    fr: 'Panneau admin',
    de: 'Adminbereich'
  }),
  literal('home.hero.stats.products', {
    es: 'Productos activos',
    en: 'Active products',
    fr: 'Produits actifs',
    de: 'Aktive Produkte'
  }),
  literal('home.hero.stats.pending', {
    es: 'Pedidos pendientes',
    en: 'Pending orders',
    fr: 'Commandes en attente',
    de: 'Offene Bestellungen'
  }),
  literal('home.hero.stats.monitor', {
    es: 'Monitorear',
    en: 'Monitor',
    fr: 'Surveiller',
    de: 'Überwachen'
  }),
  literal('home.hero.stats.users', {
    es: 'Usuarios activos',
    en: 'Active users',
    fr: 'Utilisateurs actifs',
    de: 'Aktive Benutzer'
  }),
  literal('home.hero.stats.revenue', {
    es: 'Ingresos del mes',
    en: 'Monthly revenue',
    fr: 'Revenus du mois',
    de: 'Monatsumsatz'
  }),
  literal('home.catalog.title', {
    es: 'Productos listos para demo',
    en: 'Products ready for demo',
    fr: 'Produits prêts pour la démo',
    de: 'Produkte für Demos bereit'
  }),
  literal('home.catalog.description', {
    es: 'Muestra Elasticsearch, MySQL y Kafka en acción.',
    en: 'Showcases Elasticsearch, MySQL and Kafka in action.',
    fr: 'Met en avant Elasticsearch, MySQL et Kafka en action.',
    de: 'Zeigt Elasticsearch, MySQL und Kafka in Aktion.'
  }),
  literal('home.catalog.status.active', {
    es: 'Activo',
    en: 'Active',
    fr: 'Actif',
    de: 'Aktiv'
  }),
  literal('home.catalog.card.link', {
    es: 'Revisar en catálogo',
    en: 'View in catalog',
    fr: 'Voir dans le catalogue',
    de: 'Im Katalog ansehen'
  }),
  literal('home.catalog.empty', {
    es: 'Aún no hay productos. Agrega algunos desde catalog-service.',
    en: 'No products yet. Seed catalog-service to populate.',
    fr: 'Pas encore de produits. Ajoutez-les via catalog-service.',
    de: 'Noch keine Produkte. Über catalog-service befüllen.'
  }),
  literal('home.experience.catalog.title', {
    es: 'Catálogo inteligente',
    en: 'Smart catalog',
    fr: 'Catalogue intelligent',
    de: 'Intelligenter Katalog'
  }),
  literal('home.experience.catalog.description', {
    es: 'Elasticsearch + MySQL para búsquedas enriquecidas.',
    en: 'Elasticsearch + MySQL for enriched search.',
    fr: 'Elasticsearch + MySQL pour une recherche enrichie.',
    de: 'Elasticsearch + MySQL für intelligente Suche.'
  }),
  literal('home.experience.catalog.link', {
    es: 'Explorar catálogo',
    en: 'Explore catalog',
    fr: 'Explorer le catalogue',
    de: 'Katalog erkunden'
  }),
  literal('home.experience.orders.title', {
    es: 'Pedidos orquestados',
    en: 'Orchestrated orders',
    fr: 'Commandes orchestrées',
    de: 'Orchestrierte Bestellungen'
  }),
  literal('home.experience.orders.description', {
    es: 'Validaciones cruzadas y trazabilidad WebClient.',
    en: 'WebClient cross-validation and full traceability.',
    fr: 'Validations croisées WebClient et traçabilité.',
    de: 'WebClient-Validierung und Nachverfolgbarkeit.'
  }),
  literal('home.experience.orders.link', {
    es: 'Ver pedidos',
    en: 'View orders',
    fr: 'Voir les commandes',
    de: 'Bestellungen ansehen'
  }),
  literal('home.experience.identity.title', {
    es: 'Gobierno de identidades',
    en: 'Identity governance',
    fr: 'Gouvernance des identités',
    de: 'Identity-Governance'
  }),
  literal('home.experience.identity.description', {
    es: 'Usuarios sincronizados con Keycloak y panel seguro.',
    en: 'Users synced with Keycloak and secured admin panel.',
    fr: 'Utilisateurs synchronisés avec Keycloak et panneau sécurisé.',
    de: 'Benutzer mit Keycloak synchronisiert und sicheres Admin-Panel.'
  }),
  literal('home.experience.identity.link', {
    es: 'Panel admin',
    en: 'Admin panel',
    fr: 'Panneau admin',
    de: 'Adminbereich'
  }),
  literal('home.quickLinks.profile.title', {
    es: 'Perfil y roles',
    en: 'Profile & roles',
    fr: 'Profil et rôles',
    de: 'Profil & Rollen'
  }),
  literal('home.quickLinks.profile.copy', {
    es: 'Consulta permisos de Keycloak y prueba el control de acceso.',
    en: 'Check Keycloak permissions and test access control.',
    fr: 'Consultez les permissions Keycloak et testez l’accès.',
    de: 'Prüfe Keycloak-Berechtigungen und teste Zugriff.'
  }),
  literal('home.quickLinks.pipeline.title', {
    es: 'Pipelines CI/CD',
    en: 'CI/CD pipelines',
    fr: 'Pipelines CI/CD',
    de: 'CI/CD-Pipelines'
  }),
  literal('home.quickLinks.pipeline.copy', {
    es: 'Jenkins, SonarQube y Docker documentados en infra-dev.',
    en: 'Jenkins, SonarQube and Docker documented in infra-dev.',
    fr: 'Jenkins, SonarQube et Docker documentés dans infra-dev.',
    de: 'Jenkins, SonarQube und Docker im infra-dev dokumentiert.'
  }),
  literal('home.quickLinks.guides.title', {
    es: 'Guides & Playbooks',
    en: 'Guides & playbooks',
    fr: 'Guides & playbooks',
    de: 'Guides & Playbooks'
  }),
  literal('home.quickLinks.guides.copy', {
    es: 'Documentación API-First, DevOps y seguridad incluida.',
    en: 'API-first, DevOps and security docs included.',
    fr: 'Documentation API-First, DevOps et sécurité incluse.',
    de: 'API-First-, DevOps- und Security-Dokumentation enthalten.'
  }),
  literal('profile.breadcrumb.catalog', {
    es: 'Catálogo',
    en: 'Catalog',
    fr: 'Catalogue',
    de: 'Katalog'
  }),
  literal('profile.breadcrumb.profile', {
    es: 'Perfil',
    en: 'Profile',
    fr: 'Profil',
    de: 'Profil'
  }),
  literal('profile.hero.title', {
    es: 'Mi Perfil',
    en: 'My profile',
    fr: 'Mon profil',
    de: 'Mein Profil'
  }),
  literal('profile.hero.description', {
    es: 'Gestiona datos personales, seguridad y preferencias de notificación.',
    en: 'Manage personal data, security and notification preferences.',
    fr: 'Gérez vos données personnelles, sécurité et préférences.',
    de: 'Verwalte persönliche Daten, Sicherheit und Benachrichtigungen.'
  }),
  literal('profile.hero.changeAvatar', {
    es: 'Cambiar avatar',
    en: 'Change avatar',
    fr: 'Changer d’avatar',
    de: 'Avatar ändern'
  }),
  literal('profile.status.active', {
    es: 'Cuenta activa',
    en: 'Active account',
    fr: 'Compte actif',
    de: 'Aktives Konto'
  }),
  literal('profile.stats.orders', {
    es: 'Pedidos',
    en: 'Orders',
    fr: 'Commandes',
    de: 'Bestellungen'
  }),
  literal('profile.stats.memberSince', {
    es: 'Miembro desde',
    en: 'Member since',
    fr: 'Membre depuis',
    de: 'Mitglied seit'
  }),
  literal('profile.quickActions.title', {
    es: 'Acciones rápidas',
    en: 'Quick actions',
    fr: 'Actions rapides',
    de: 'Schnellaktionen'
  }),
  literal('profile.quickActions.password', {
    es: 'Cambiar contraseña',
    en: 'Change password',
    fr: 'Changer le mot de passe',
    de: 'Passwort ändern'
  }),
  literal('profile.quickActions.download', {
    es: 'Descargar mis datos',
    en: 'Download my data',
    fr: 'Télécharger mes données',
    de: 'Meine Daten herunterladen'
  }),
  literal('profile.quickActions.activity', {
    es: 'Actividad reciente',
    en: 'Recent activity',
    fr: 'Activité récente',
    de: 'Aktuelle Aktivitäten'
  }),
  literal('profile.quickActions.delete', {
    es: 'Eliminar cuenta',
    en: 'Delete account',
    fr: 'Supprimer le compte',
    de: 'Konto löschen'
  }),
  literal('profile.preferences.title', {
    es: 'Preferencias',
    en: 'Preferences',
    fr: 'Préférences',
    de: 'Einstellungen'
  }),
  literal('profile.preferences.transactional.title', {
    es: 'Emails transaccionales',
    en: 'Transactional emails',
    fr: 'Emails transactionnels',
    de: 'Transaktions-E-Mails'
  }),
  literal('profile.preferences.transactional.description', {
    es: 'Confirmaciones, facturas y actualizaciones importantes.',
    en: 'Confirmations, invoices and important updates.',
    fr: 'Confirmations, factures et mises à jour importantes.',
    de: 'Bestätigungen, Rechnungen und wichtige Updates.'
  }),
  literal('profile.preferences.push.title', {
    es: 'Notificaciones push',
    en: 'Push notifications',
    fr: 'Notifications push',
    de: 'Push-Benachrichtigungen'
  }),
  literal('profile.preferences.push.description', {
    es: 'Recordatorios sobre pedidos y seguridad.',
    en: 'Reminders about orders and security.',
    fr: 'Rappels sur les commandes et la sécurité.',
    de: 'Erinnerungen zu Bestellungen und Sicherheit.'
  }),
  literal('profile.preferences.marketing.title', {
    es: 'Emails de marketing',
    en: 'Marketing emails',
    fr: 'Emails marketing',
    de: 'Marketing-E-Mails'
  }),
  literal('profile.preferences.marketing.description', {
    es: 'Novedades y contenido exclusivo del portfolio.',
    en: 'Portfolio news and exclusive content.',
    fr: 'Actualités du portfolio et contenu exclusif.',
    de: 'Portfolio-News und exklusiver Inhalt.'
  }),
  literal('profile.personal.title', {
    es: 'Información personal',
    en: 'Personal information',
    fr: 'Informations personnelles',
    de: 'Persönliche Informationen'
  }),
  literal('profile.personal.edit', {
    es: 'Editar',
    en: 'Edit',
    fr: 'Modifier',
    de: 'Bearbeiten'
  }),
  literal('profile.personal.firstName', {
    es: 'Nombre',
    en: 'First name',
    fr: 'Prénom',
    de: 'Vorname'
  }),
  literal('profile.personal.lastName', {
    es: 'Apellidos',
    en: 'Last name',
    fr: 'Nom de famille',
    de: 'Nachname'
  }),
  literal('profile.personal.fullName', {
    es: 'Nombre completo',
    en: 'Full name',
    fr: 'Nom complet',
    de: 'Vollständiger Name'
  }),
  literal('profile.personal.email', {
    es: 'Email',
    en: 'Email',
    fr: 'Email',
    de: 'E-Mail'
  }),
  literal('profile.personal.phone', {
    es: 'Teléfono',
    en: 'Phone',
    fr: 'Téléphone',
    de: 'Telefon'
  }),
  literal('profile.personal.username', {
    es: 'Usuario',
    en: 'Username',
    fr: 'Utilisateur',
    de: 'Benutzername'
  }),
  literal('profile.personal.cancel', {
    es: 'Cancelar',
    en: 'Cancel',
    fr: 'Annuler',
    de: 'Abbrechen'
  }),
  literal('profile.personal.save', {
    es: 'Guardar cambios',
    en: 'Save changes',
    fr: 'Enregistrer',
    de: 'Änderungen speichern'
  }),
  literal('profile.personal.saving', {
    es: 'Guardando...',
    en: 'Saving...',
    fr: 'Enregistrement...',
    de: 'Speichern...'
  }),
  literal('profile.personal.unset', {
    es: 'No especificado',
    en: 'Not provided',
    fr: 'Non renseigné',
    de: 'Nicht angegeben'
  }),
  literal('profile.roles.title', {
    es: 'Roles y permisos',
    en: 'Roles & permissions',
    fr: 'Rôles et permissions',
    de: 'Rollen & Berechtigungen'
  }),
  literal('profile.roles.badge', {
    es: 'Solo lectura',
    en: 'Read only',
    fr: 'Lecture seule',
    de: 'Nur Lesen'
  }),
  literal('profile.roles.helper', {
    es: 'Gestiona y verifica los permisos asociados a tu cuenta.',
    en: 'Manage and verify the permissions granted to your account.',
    fr: 'Gérez et vérifiez les permissions associées à votre compte.',
    de: 'Verwalte und prüfe die deinem Konto zugewiesenen Berechtigungen.'
  }),
  literal('profile.roles.link', {
    es: 'Abrir panel administrativo',
    en: 'Open admin panel',
    fr: 'Ouvrir le panneau admin',
    de: 'Adminbereich öffnen'
  }),
  literal('profile.roles.labels.admin', {
    es: 'Administrador',
    en: 'Administrator',
    fr: 'Administrateur',
    de: 'Administrator'
  }),
  literal('profile.roles.labels.user', {
    es: 'Usuario',
    en: 'User',
    fr: 'Utilisateur',
    de: 'Benutzer'
  }),
  literal('profile.roles.labels.catalogRead', {
    es: 'Lectura catálogo',
    en: 'Catalog read',
    fr: 'Lecture catalogue',
    de: 'Katalog lesen'
  }),
  literal('profile.roles.labels.ordersWrite', {
    es: 'Gestión pedidos',
    en: 'Orders write',
    fr: 'Gestion des commandes',
    de: 'Bestellungen verwalten'
  }),
  literal('profile.security.title', {
    es: 'Seguridad',
    en: 'Security',
    fr: 'Sécurité',
    de: 'Sicherheit'
  }),
  literal('profile.security.password', {
    es: 'Contraseña',
    en: 'Password',
    fr: 'Mot de passe',
    de: 'Passwort'
  }),
  literal('profile.security.change', {
    es: 'Cambiar',
    en: 'Change',
    fr: 'Changer',
    de: 'Ändern'
  }),
  literal('profile.security.twoFactor', {
    es: 'Autenticación de dos factores',
    en: 'Two-factor authentication',
    fr: 'Authentification à deux facteurs',
    de: 'Zwei-Faktor-Authentifizierung'
  }),
  literal('profile.security.twoFactorDescription', {
    es: 'Añade una capa extra de seguridad.',
    en: 'Add an extra security layer.',
    fr: 'Ajoutez une couche de sécurité supplémentaire.',
    de: 'Füge eine zusätzliche Sicherheitsschicht hinzu.'
  }),
  literal('profile.security.twoFactorConfigured', {
    es: 'Configurado',
    en: 'Configured',
    fr: 'Configuré',
    de: 'Konfiguriert'
  }),
  literal('profile.security.twoFactorConfigure', {
    es: 'Configurar',
    en: 'Configure',
    fr: 'Configurer',
    de: 'Konfigurieren'
  }),
  literal('profile.security.sessions', {
    es: 'Sesiones activas',
    en: 'Active sessions',
    fr: 'Sessions actives',
    de: 'Aktive Sitzungen'
  }),
  literal('profile.security.sessionsDescription', {
    es: 'Dispositivos conectados',
    en: 'Connected devices',
    fr: 'Appareils connectés',
    de: 'Verbundene Geräte'
  }),
  literal('profile.security.sessionsButton', {
    es: 'Ver todas',
    en: 'View all',
    fr: 'Tout voir',
    de: 'Alle anzeigen'
  }),
  literal('profile.security.notAvailable', {
    es: 'No disponible',
    en: 'Not available',
    fr: 'Non disponible',
    de: 'Nicht verfügbar'
  }),
  literal('profile.notifications.personalSaved', {
    es: 'Perfil actualizado correctamente',
    en: 'Profile updated successfully',
    fr: 'Profil mis à jour',
    de: 'Profil aktualisiert'
  }),
  literal('profile.notifications.personalError', {
    es: 'Error al actualizar el perfil',
    en: 'Could not update profile',
    fr: 'Impossible de mettre à jour le profil',
    de: 'Profil konnte nicht aktualisiert werden'
  }),
  literal('profile.notifications.avatarSaved', {
    es: 'Avatar actualizado correctamente',
    en: 'Avatar updated successfully',
    fr: 'Avatar mis à jour',
    de: 'Avatar aktualisiert'
  }),
  literal('profile.notifications.avatarError', {
    es: 'No se pudo actualizar el avatar',
    en: 'Avatar update failed',
    fr: 'Échec de la mise à jour de l’avatar',
    de: 'Avatar konnte nicht aktualisiert werden'
  }),
  literal('profile.notifications.deleteConfirm', {
    es: 'Esta acción eliminará tu cuenta de demostración. ¿Deseas continuar?',
    en: 'This action removes your demo account. Continue?',
    fr: 'Cette action supprimera votre compte démo. Continuer ?',
    de: 'Dies löscht dein Demo-Konto. Fortfahren?'
  }),
  literal('profile.notifications.deleteSuccess', {
    es: 'Cuenta eliminada correctamente',
    en: 'Account deleted successfully',
    fr: 'Compte supprimé',
    de: 'Konto gelöscht'
  }),
  literal('profile.notifications.preferencesSaved', {
    es: 'Preferencias guardadas',
    en: 'Preferences saved',
    fr: 'Préférences enregistrées',
    de: 'Einstellungen gespeichert'
  }),
  literal('profile.notifications.2fa', {
    es: 'Configura 2FA desde el portal de Keycloak',
    en: 'Configure 2FA from the Keycloak portal',
    fr: 'Configurez la 2FA depuis Keycloak',
    de: '2FA im Keycloak-Portal konfigurieren'
  }),
  literal('profile.notifications.activity', {
    es: 'Actividad disponible en el panel de Keycloak',
    en: 'Activity is available in the Keycloak panel',
    fr: 'Activité disponible dans Keycloak',
    de: 'Aktivität im Keycloak-Panel verfügbar'
  }),
  literal('profile.notifications.sessions', {
    es: 'Revisa las sesiones activas en Keycloak',
    en: 'Review active sessions in Keycloak',
    fr: 'Consultez les sessions actives dans Keycloak',
    de: 'Aktive Sitzungen in Keycloak prüfen'
  }),
  literal('profile.loading', {
    es: 'Cargando perfil...',
    en: 'Loading profile...',
    fr: 'Chargement du profil...',
    de: 'Profil wird geladen...'
  }),
  literal('dashboard.hero.eyebrow', {
    es: 'Observabilidad',
    en: 'Observability',
    fr: 'Observabilité',
    de: 'Observierbarkeit'
  }),
  literal('dashboard.hero.title', {
    es: 'Tableros y métricas listos para auditar',
    en: 'Dashboards & metrics ready for audits',
    fr: 'Tableaux et métriques prêts pour audit',
    de: 'Dashboards & Metriken auditbereit'
  }),
  literal('dashboard.hero.description', {
    es: 'Grafana, Prometheus y eventos del gateway expuestos en vivo.',
    en: 'Grafana, Prometheus and gateway events exposed live.',
    fr: 'Grafana, Prometheus et événements du gateway exposés en temps réel.',
    de: 'Grafana, Prometheus und Gateway-Events live sichtbar.'
  }),
  literal('dashboard.hero.cta.prometheus', {
    es: 'Abrir Prometheus',
    en: 'Open Prometheus',
    fr: 'Ouvrir Prometheus',
    de: 'Prometheus öffnen'
  }),
  literal('dashboard.hero.cta.grafana', {
    es: 'Abrir Grafana',
    en: 'Open Grafana',
    fr: 'Ouvrir Grafana',
    de: 'Grafana öffnen'
  }),
  literal('dashboard.metrics.products', {
    es: 'Productos monitoreados',
    en: 'Products monitored',
    fr: 'Produits surveillés',
    de: 'Überwachte Produkte'
  }),
  literal('dashboard.metrics.users', {
    es: 'Usuarios registrados',
    en: 'Registered users',
    fr: 'Utilisateurs enregistrés',
    de: 'Registrierte Benutzer'
  }),
  literal('dashboard.metrics.pending', {
    es: 'Pedidos pendientes',
    en: 'Pending orders',
    fr: 'Commandes en attente',
    de: 'Offene Bestellungen'
  }),
  literal('dashboard.highlight.title', {
    es: 'Productos destacados',
    en: 'Highlighted products',
    fr: 'Produits mis en avant',
    de: 'Hervorgehobene Produkte'
  }),
  literal('dashboard.highlight.empty', {
    es: 'No hay productos para destacar todavía.',
    en: 'No products to highlight yet.',
    fr: 'Aucun produit à mettre en avant pour le moment.',
    de: 'Noch keine Produkte zum Hervorheben.'
  }),
  literal('dashboard.endpoints.title', {
    es: 'Endpoints de observabilidad',
    en: 'Observability endpoints',
    fr: 'Endpoints d’observabilité',
    de: 'Observability-Endpunkte'
  }),
  literal('dashboard.endpoints.description', {
    es: 'Comparte estos accesos con recruiters o usa port-forward para auditorías.',
    en: 'Share these entrypoints with recruiters or port-forward for audits.',
    fr: 'Partagez ces accès avec les recruteurs ou utilisez le port-forward pour les audits.',
    de: 'Teile diese Endpunkte mit Recruitern oder nutze Port-Forward für Audits.'
  }),
  literal('dashboard.endpoints.prometheus', {
    es: 'Targets Prometheus',
    en: 'Prometheus targets',
    fr: 'Cibles Prometheus',
    de: 'Prometheus-Targets'
  }),
  literal('dashboard.endpoints.grafana', {
    es: 'Panel Grafana',
    en: 'Grafana panel',
    fr: 'Tableau Grafana',
    de: 'Grafana-Panel'
  }),
  literal('dashboard.endpoints.keycloak', {
    es: 'Auditoría Keycloak',
    en: 'Keycloak audit',
    fr: 'Audit Keycloak',
    de: 'Keycloak-Audit'
  }),
  literal('dashboard.endpoints.open', {
    es: 'Abrir endpoint',
    en: 'Open endpoint',
    fr: 'Ouvrir l’endpoint',
    de: 'Endpoint öffnen'
  }),
  literal('profile.security.lastUpdate', {
    es: 'Última actualización',
    en: 'Last updated',
    fr: 'Dernière mise à jour',
    de: 'Zuletzt aktualisiert'
  }),

  literal('catalog.admin.form.requiredHint', {
    es: 'Solo necesitas completar estos campos obligatorios.',
    en: 'Only these required fields are needed.',
    fr: 'Seuls ces champs requis sont necessaires.',
    de: 'Es genuegen die Pflichtfelder.'
  }),
  literal('catalog.admin.form.showAdvanced', {
    es: 'Mostrar campos opcionales',
    en: 'Show optional fields',
    fr: 'Afficher les champs optionnels',
    de: 'Optionale Felder anzeigen'
  }),
  literal('catalog.admin.form.hideAdvanced', {
    es: 'Ocultar campos opcionales',
    en: 'Hide optional fields',
    fr: 'Masquer les champs optionnels',
    de: 'Optionale Felder ausblenden'
  }),
  literal('catalog.admin.form.advancedHint', {
    es: 'Los siguientes datos son opcionales y enriquecen la ficha.',
    en: 'The following data is optional and enriches the card.',
    fr: 'Les informations suivantes sont optionnelles et enrichissent la fiche.',
    de: 'Die folgenden Angaben sind optional und erweitern den Eintrag.'
  }),
  literal('catalog.admin.form.placeholders.name', {
    es: 'Ej. Portfolio Cloud Expert',
    en: 'e.g. Portfolio Cloud Expert',
    fr: 'Ex. Portfolio Cloud Expert',
    de: 'z. B. Portfolio Cloud Expert'
  }),
  literal('catalog.admin.form.placeholders.sku', {
    es: 'Ej. PORT-0001',
    en: 'e.g. PORT-0001',
    fr: 'Ex. PORT-0001',
    de: 'z. B. PORT-0001'
  }),
  literal('catalog.admin.form.placeholders.price', {
    es: 'Ej. 99.90',
    en: 'e.g. 99.90',
    fr: 'Ex. 99.90',
    de: 'z. B. 99,90'
  }),
  literal('catalog.admin.form.placeholders.currency', {
    es: 'Ej. EUR',
    en: 'e.g. EUR',
    fr: 'Ex. EUR',
    de: 'z. B. EUR'
  }),
  literal('catalog.admin.form.placeholders.stock', {
    es: 'Ej. 25',
    en: 'e.g. 25',
    fr: 'Ex. 25',
    de: 'z. B. 25'
  }),
  literal('catalog.admin.form.placeholders.tags', {
    es: 'mentor, spring, kubernetes',
    en: 'mentor, spring, kubernetes',
    fr: 'mentor, spring, kubernetes',
    de: 'mentor, spring, kubernetes'
  }),
  literal('catalog.admin.form.placeholders.description', {
    es: 'Detalle opcional del servicio',
    en: 'Optional service details',
    fr: 'Details optionnels du service',
    de: 'Optionale Servicedetails'
  }),

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

