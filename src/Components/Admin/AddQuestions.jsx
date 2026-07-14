import React, { useState } from 'react';
import { TrashIcon, EditIcon, PlusIcon, CheckIcon, AlertCircleIcon } from '../Icons';

const QuestionsTab = ({
  token,
  isAdmin,
  questions,
  fetchQuestions,
  fetchStats,
  showAlert,
  showConfirm,
  systemConfig,
  handleConfigToggle,
  handleQuestionSubmit,
  handleEditQuestion,
  handleDeleteQuestion,
  handleBulkDeleteQuestions,
  handleExcelUpload,
  questionForm,
  setQuestionForm,
  showQuestionModal,
  setShowQuestionModal,
  isEditingQuestion,
  setIsEditingQuestion,
  excelUploadSet,
  setExcelUploadSet,
  excelUploading,
  excelResult,
  setExcelResult,
  excelFileName,
  setExcelFileName,
  questionFilter,
  setQuestionFilter,
  selectedQuestionIds,
  setSelectedQuestionIds
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* TOP CONTROLS & SHUFFLE CONFIGS FOR STAFF */}
      {!isAdmin && (
        <div className="glass rounded-xl border border-slate-200 p-6 shadow-md bg-white">
          <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Active Drive Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <h5 className="text-xs font-bold text-slate-700">Shuffle Questions</h5>
                <span className="text-[10px] text-slate-400">Enable/disable randomized question order</span>
              </div>
              <input
                type="checkbox"
                checked={systemConfig.shuffleQuestions}
                onChange={(e) => handleConfigToggle('shuffleQuestions', e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-slate-300 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <h5 className="text-xs font-bold text-slate-700">Shuffle Options</h5>
                <span className="text-[10px] text-slate-400">Enable/disable randomized option choices</span>
              </div>
              <input
                type="checkbox"
                checked={systemConfig.shuffleOptions}
                onChange={(e) => handleConfigToggle('shuffleOptions', e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-slate-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* EXCEL IMPORT CARD */}
      <div className="glass rounded-2xl border border-slate-200 p-6 shadow-md bg-white text-left">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bulk Import from Excel (.xlsx)</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Upload questions in bulk. Your Excel must have exactly these column headers:
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {['QuestionsNo', 'Question', 'optionA', 'option B', 'optionC', 'optionD', 'correct Answer'].map(h => (
            <code key={h} className="bg-slate-100 text-indigo-700 border border-slate-200 px-2 py-0.5 rounded font-mono text-[11px] font-bold">{h}</code>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
          {/* Select target set */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-600">Target Set:</span>
            <select
              value={excelUploadSet}
              onChange={(e) => { setExcelUploadSet(e.target.value); setExcelResult(null); }}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 text-xs font-bold cursor-pointer"
              disabled={excelUploading}
            >
              <option value="A">Set A</option>
              <option value="B">Set B</option>
              <option value="C">Set C</option>
              <option value="D">Set D</option>
            </select>
          </div>

          {/* Upload input button */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <input
              type="file"
              id="excelFileInput"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleExcelUpload}
              disabled={excelUploading}
            />
            <button
              onClick={() => { setExcelResult(null); document.getElementById('excelFileInput').click(); }}
              disabled={excelUploading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-all shadow-sm border ${
                excelUploading
                  ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500'
              }`}
            >
              {excelUploading ? (
                <>
                  <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Choose & Upload Excel
                </>
              )}
            </button>
            {excelFileName && (
              <span className="text-xs text-slate-500 italic truncate max-w-[180px]" title={excelFileName}>
                📎 {excelFileName}
              </span>
            )}
          </div>
        </div>

        {/* Upload Result Banner */}
        {excelResult && (
          <div className={`rounded-xl p-4 border text-sm ${
            excelResult.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-start gap-2">
              {excelResult.type === 'success' ? (
                <CheckIcon className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircleIcon className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-semibold">{excelResult.message}</p>
                {excelResult.type === 'success' && (
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                      ✅ {excelResult.imported} imported
                    </span>
                    {excelResult.skipped > 0 && (
                      <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold border border-amber-200">
                        ⚠️ {excelResult.skipped} skipped
                      </span>
                    )}
                  </div>
                )}
                {excelResult.skippedRows && excelResult.skippedRows.length > 0 && (
                  <p className="mt-2 text-xs text-amber-700 font-medium">
                    Skipped row(s): {excelResult.skippedRows.join(', ')} — missing required fields
                  </p>
                )}
              </div>
              <button
                onClick={() => setExcelResult(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors ml-1 flex-shrink-0 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QUESTIONS LIST PANEL */}
      <div className="glass rounded-2xl border border-slate-200 p-6 shadow-xl bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Drive Assessment Question Bank</h2>
            <span className="text-xs text-slate-500 font-medium">
              {questionFilter === 'All' ? questions.length : questions.filter(q => q.setName === questionFilter).length} question(s)
              {questionFilter !== 'All' ? ` in Set ${questionFilter}` : ' total'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Set Filter Tabs */}
            <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl">
              {['All', 'A', 'B', 'C', 'D'].map(f => (
                <button
                  key={f}
                  onClick={() => { setQuestionFilter(f); setSelectedQuestionIds([]); }}
                  className={`py-1 px-3 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    questionFilter === f ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f === 'All' ? 'All' : `Set ${f}`}
                  <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    questionFilter === f ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {f === 'All' ? questions.length : questions.filter(q => q.setName === f).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Bulk Delete Button */}
            {selectedQuestionIds.length > 0 && (
              <button
                onClick={handleBulkDeleteQuestions}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
              >
                <TrashIcon className="w-3.5 h-3.5" />
                Delete {selectedQuestionIds.length} Selected
              </button>
            )}

            {/* Add Single Question */}
            <button
              onClick={() => {
                setQuestionForm({ _id: '', questionText: '', options: ['', '', '', ''], correctOptionIndex: 0, setName: 'A' });
                setIsEditingQuestion(false);
                setShowQuestionModal(true);
              }}
              className="flex items-center gap-1.5 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>
        </div>

        {/* Questions Bank List */}
        {(() => {
          const filtered = questionFilter === 'All' ? questions : questions.filter(q => q.setName === questionFilter);
          return filtered.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">
              {questionFilter === 'All' ? 'No questions uploaded yet.' : `No questions in Set ${questionFilter}.`}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Select-all row */}
              <div className="flex items-center gap-3 px-2 py-2 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && filtered.every(q => selectedQuestionIds.includes(q._id))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedQuestionIds(prev => [...new Set([...prev, ...filtered.map(q => q._id)])]);
                    } else {
                      setSelectedQuestionIds(prev => prev.filter(id => !filtered.map(q => q._id).includes(id)));
                    }
                  }}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-slate-300 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-500">
                  {filtered.every(q => selectedQuestionIds.includes(q._id)) && filtered.length > 0
                    ? `All ${filtered.length} selected`
                    : `Select all ${filtered.length}`}
                </span>
                {selectedQuestionIds.length > 0 && (
                  <button
                    onClick={() => setSelectedQuestionIds([])}
                    className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
                  >
                    Clear selection
                  </button>
                )}
              </div>

              {filtered.map((q, idx) => {
                const isSelected = selectedQuestionIds.includes(q._id);
                return (
                  <div
                    key={q._id}
                    className={`p-5 border rounded-xl flex flex-col md:flex-row justify-between gap-4 transition-colors ${
                      isSelected ? 'bg-indigo-50/60 border-indigo-200' : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    {/* Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedQuestionIds(prev => [...prev, q._id]);
                          } else {
                            setSelectedQuestionIds(prev => prev.filter(id => id !== q._id));
                          }
                        }}
                        className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-white border-slate-300 cursor-pointer flex-shrink-0"
                      />
                      <div className="space-y-3 flex-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 font-bold rounded text-xs border border-indigo-100">Set {q.setName}</span>
                          <span className="text-xs text-slate-400 font-bold font-mono">Q#{idx + 1}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base leading-relaxed">{q.questionText}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {q.options.map((opt, oIdx) => {
                            const isCorrect = oIdx === q.correctOptionIndex;
                            return (
                              <div
                                key={oIdx}
                                className={`p-2 rounded border text-xs flex items-center ${
                                  isCorrect
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold'
                                    : 'bg-white border-slate-200 text-slate-500'
                                }`}
                              >
                                <span className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 text-[10px] font-bold ${
                                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Edit / Delete buttons */}
                    <div className="flex md:flex-col justify-end gap-2 h-fit self-end md:self-start">
                      <button
                        onClick={() => handleEditQuestion(q)}
                        className="p-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-lg transition-colors cursor-pointer shadow-sm"
                        title="Edit Question"
                        aria-label={`Edit question: ${q.questionText.slice(0, 50)}`}
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Question"
                        aria-label={`Delete question: ${q.questionText.slice(0, 50)}`}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default QuestionsTab;
