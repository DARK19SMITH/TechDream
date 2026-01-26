"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, Edit, Trash2, Eye, EyeOff, 
  X, Save, Tag, Image as ImageIcon,
  Lightbulb, Upload
} from "lucide-react";
import { Article, supabase } from "@/lib/supabase";

export default function AdminConseilsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "conseil" as Article["category"],
    published: true,
  });

  const fetchArticles = async () => {
    const res = await fetch("/api/articles");
    const data = await res.json();
    const filtered = data.filter((a: Article) => a.category === "conseil" || a.category === "astuce");
    setArticles(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors du téléversement de l\'image');
    } finally {
      setIsUploading(false);
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setFormData({
        title: article.title,
        content: article.content,
        image: article.image || "",
        category: article.category,
        published: article.published,
      });
    } else {
      setEditingArticle(null);
      setFormData({
        title: "",
        content: "",
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800",
        category: "conseil",
        published: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (editingArticle) {
      await fetch(`/api/articles/${editingArticle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    fetchArticles();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce conseil ?")) {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      fetchArticles();
    }
  };

  const togglePublish = async (article: Article) => {
    await fetch(`/api/articles/${article.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !article.published }),
    });
    fetchArticles();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0066ff]/30 border-t-[#0066ff] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-orbitron text-3xl font-bold text-[#0a1628] mb-2 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-[#00d4ff]" />
              Conseils & Astuces
            </h1>
            <p className="text-gray-600 font-rajdhani">
              {articles.length} conseils au total
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="btn-tech flex items-center gap-2 w-fit"
          >
            <Plus className="w-5 h-5" />
            Nouveau conseil
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un conseil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-tech overflow-hidden group"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={article.image || ""}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  article.category === "conseil" ? "bg-[#0066ff] text-white" : "bg-purple-500 text-white"
                }`}>
                  {article.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => togglePublish(article)}
                  className={`p-2 rounded-full transition-colors ${
                    article.published
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {article.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-orbitron text-lg font-semibold text-[#0a1628] mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 font-rajdhani text-sm mb-4 line-clamp-2">
                {article.content}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(article.created_at).toLocaleDateString('fr-FR')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(article)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-[#0066ff]/10 hover:text-[#0066ff] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-orbitron text-xl text-gray-600 mb-2">Aucun conseil trouvé</h3>
          <p className="text-gray-500 mb-6">Commencez par créer votre premier conseil</p>
          <button onClick={() => openModal()} className="btn-tech">
            <Plus className="w-5 h-5 mr-2" />
            Créer un conseil
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-orbitron text-xl font-semibold text-[#0a1628]">
                  {editingArticle ? "Modifier le conseil" : "Nouveau conseil"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre du conseil
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                      placeholder="Ex: Comment optimiser son PC pour les jeux"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani resize-none"
                      placeholder="Décrivez votre conseil en détail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <ImageIcon className="w-4 h-4 inline mr-2" />
                      Image de couverture
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani pr-12"
                            placeholder="URL de l'image ou téléversez-en une..."
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                        <label className={`cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed transition-all ${
                          isUploading 
                            ? "bg-gray-50 border-gray-300 text-gray-400" 
                            : "bg-[#0066ff]/5 border-[#0066ff]/20 text-[#0066ff] hover:bg-[#0066ff]/10"
                        }`}>
                          <Upload className={`w-5 h-5 ${isUploading ? "animate-bounce" : ""}`} />
                          <span className="font-medium whitespace-nowrap">
                            {isUploading ? "Téléversement..." : "Téléverser"}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                      {formData.image && (
                        <div className="relative rounded-xl overflow-hidden border border-gray-100 group">
                          <img src={formData.image} alt="Preview" className="w-full h-48 object-cover" />
                          <button
                            onClick={() => setFormData({ ...formData, image: "" })}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    Type
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Article["category"] })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                  >
                    <option value="conseil">Conseil</option>
                    <option value="astuce">Astuce</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#0066ff]/5 border border-[#0066ff]/10">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#0066ff] focus:ring-[#0066ff]"
                  />
                  <label htmlFor="published" className="text-sm text-gray-700">
                    Publier immédiatement sur le site
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="btn-tech flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingArticle ? "Mettre à jour" : "Publier"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
